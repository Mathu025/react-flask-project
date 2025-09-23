from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
import re


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///travelbuddy.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}
metadata = MetaData(naming_convention=convention)

db = SQLAlchemy(app, metadata=metadata)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)

#Creating User model
class User(db.Model, SerializerMixin):
    __tablename__="users"
    serialize_rules = ('-trips.user', '-group_memberships.user',)


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column('password', db.String, nullable=False)
    profile_pic = db.Column(db.String)
    role = db.Column(db.String, nullable=False)

    trips = db.relationship('Trip', back_populates='user')
    group_memberships = db.relationship('GroupMembership', back_populates='user')


    @validates('email')
    def validate_email(self, key, address):
        if not re.match(r"[^@]+@[^@]+\.[^@]+", address):
            raise ValueError(f"Invalid email address: {address}")
        return address

    # Authenticating password
    @property
    def password(self):
        raise AttributeError("Password is write-only!")

    @password.setter
    def password_hash(self, password):
        pw_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = pw_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<{self.id} {self.name} {self.email}>'

#Creating Trip model
class Trip(db.Model, SerializerMixin):
    __tablename__="trips"
    serialize_rules = ('-user.trips',)


    id = db.Column(db.Integer, primary_key=True)
    destination = db.Column(db.String(100), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    details = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='trips')


    def __repr__(self):
        return f"<Trip {self.destination}>"

#creating travelgroup model
class TravelGroup(db.Model, SerializerMixin):
    __tablename__ = 'travelgroups'
    serialize_rules = ('-group_memberships.travelgroup',)


    id = db.Column(db.Integer, primary_key=True)
    group_name = db.Column(db.String(100), nullable=False)
    max_members = db.Column(db.Integer)

    
    group_memberships = db.relationship('GroupMembership', back_populates='travelgroup')


    @validates('max_members')
    def validate_max_members(self, key, value):
        if value is not None and (not isinstance(value, int) or value < 1):
            raise ValueError("max_members must be a positive integer")
        return value
    
    def __repr__(self):
        return f"<TravelGroup {self.group_name}>"
    
#creating an association object
class GroupMembership(db.Model, SerializerMixin):
    __tablename__ = 'group_memberships'
    serialize_rules = ('-user.group_memberships', '-travelgroup.group_memberships',)
    
    id = db.Column(db.Integer, primary_key=True)
    is_active = db.Column(db.Boolean, default=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('travelgroups.id'), nullable=False)

    user = db.relationship('User', back_populates='group_memberships')
    travelgroup = db.relationship('TravelGroup', back_populates='group_memberships')

    def __repr__(self):
        return f"<GroupMembership {self.id}>"


# --- Example Routes ---
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users])

@app.route('/users', methods=['POST'])
def create_user():
    data = request.json
    user = User(
        name=data['name'],
        email=data['email'],
        role=data['role']
    )
    user.password = data['password']
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201

if __name__ == '__main__':
    app.run(debug=True)






