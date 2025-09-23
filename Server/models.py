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
class User(db.Model):
    __tablename__="users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column('password', db.String, nullable=False)
    profile_pic = db.Column(db.String)
    role = db.Column(db.String, nullable=False)

    trips = db.relationship('Trip', back_populates='user')

    def __repr__(self):
        f'<{self.id} {self.name} {self.email}>'

#Creating Trip model
class Trip(db.Model):
    __tablename__="trips"
    id = db.Column(db.Integer, primary_key=True)
    destination = db.Column(db.String(100), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    details = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='trips')

    travelgroups = db.relationship('TravelGroup', back_populates='trip', cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Trip {self.destination}>"

#creating travelgroup model
class TravelGroup(db.Model, SerializerMixin):
    __tablename__ = 'travelgroups'

    id = db.Column(db.Integer, primary_key=True)
    group_name = db.Column(db.String(100), nullable=False)
    max_members = db.Column(db.Integer)
    trip_id = db.Column(db.Integer, db.ForeignKey('trips.id'), nullable=False)

    trip = db.relationship('Trip', back_populates='travelgroups')

    def __repr__(self):
        return f"<TravelGroup {self.group_name}>"





