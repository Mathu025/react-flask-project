from flask import Flask, jsonify, request, make_response, session
from flask_migrate import Migrate
from flask_restful import Api, Resource

from models import db, User, Trip,TravelGroup, GroupMembership


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///travelbuddy.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)


class Start(Resource):
    def get(self):
        response_body={
            "message":"Welcome to Travel Buddy App"
        }
        response=make_response(response_body, 200)
        return response
    


class UserResource(Resource):
    def get(self):
        users=[user.to_dict() for user in User.query.all()]
        response=make_response(users, 200)
        return response

    def post(self):
        data = request.get_json()
        new_user = User(
            name=data['name'],
            email=data['email'],
            role=data['role']
        )
        new_user.password = data['password'] 

        db.session.add(new_user)
        db.session.commit()
        
        new_user_dict=new_user.to_dict()
        response=make_response(new_user_dict, 201)
        return response
class UserResourceById(Resource):
    def get(self, id):
        user = User.query.filter(User.id==id).first()
        user_dict=user.to_dict()
        response=make_response(user_dict, 200)
        return response

    def patch(self, id):
        user = User.query.filter(User.id==id).first()
        data = request.json
        if 'name' in data:
            user.name = data['name']
        if 'email' in data:
            user.email = data['email']
        if 'role' in data:
            user.role = data['role']
        if 'password' in data:
            user.password_hash = data['password']
        db.session.commit()
        user_dict= user.to_dict()
        response=make_response(user_dict, 200)
        return response

    def delete(self, id):
        user = User.query.filter(User.id==id).first()
        db.session.delete(user)
        db.session.commit()
        response_body={
            "message": "User deleted successfully"
        }
            
        response=make_response(response_body, 204)
        return response



api.add_resource(Start, '/welcome')
api.add_resource(UserResource, '/users')
api.add_resource(UserResourceById, '/users/<int:id>')




if __name__ == '__main__':
    app.run(port=5555, debug=True)

# kill -9 $(lsof -t -i:5555)