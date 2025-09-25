from datetime import datetime
from flask import Flask, jsonify, request, make_response, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS

from models import db, User, Trip,TravelGroup, GroupMembership


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///travelbuddy.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["SECRET_KEY"]="super_secret"
app.json.compact = False

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})



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
    
class Signup(Resource):
    def post(self):
        data=request.get_json()

        new_user = User(
             name=data['name'],
            email=data['email'],
            password=data['password'],
            role=data.get('role', 'user')
        )
        db.session.add(new_user)
        db.session.commit()

        session['user_id'] = new_user.id
        response = make_response(new_user.to_dict(), 201)
        return response
class Login(Resource):
    def post(self):
        data=request.get_json()
        email=data['email']
        password=data['password']

        user=User.query.filter_by(email=email).first()
        if user and user.authenticate(password):
            session['user_id']=user.id
            return user.to_dict(), 200
        return {'error': "Invalid email or password"}, 401

class Logout(Resource):
    def post(self):
            
            session.pop('user_id', None)
            return make_response({"message": "Logged out successfully"}, 200)
 

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
        if not user:
            return {"error": "User not found"}, 404
        user_dict=user.to_dict()
        response=make_response(user_dict, 200)
        return response

    def patch(self, id):
        user = User.query.filter(User.id==id).first()
        if not user:
            return {"error": "User not found"}, 404

        data = request.get_json()
        if 'name' in data:
            user.name = data['name']
        if 'email' in data:
            user.email = data['email']
        if 'role' in data:
            user.role = data['role']
        if 'password' in data:
            user.password = data['password']
        db.session.commit()
        user_dict= user.to_dict()
        response=make_response(user_dict, 200)
        return response

    def delete(self, id):
        user = User.query.filter(User.id==id).first()
        if not user:
            return {"error": "User not found"}, 404

        
        db.session.delete(user)
        db.session.commit()
        response_body={
            "message": "User deleted successfully"
        }
            
        response=make_response(response_body, 204)
        return response

class TripResource(Resource):
    def get(self):
        trips=[trip.to_dict() for trip in Trip.query.all()]
        response=make_response(trips, 200)
        return response

    def post(self):
        data = request.get_json()
        new_trip = Trip(
            destination=data['destination'],
            start_date=data['start_date'],
            end_date=data['end_date'],
            details=data['details'],
            user_id=data.get('user_id')
        )


        db.session.add(new_trip)
        db.session.commit()
        
        new_trip_dict=new_trip.to_dict()
        response=make_response(new_trip_dict, 201)
        return response
class TripResourceById(Resource):
    def get(self, id):
        trip = Trip.query.filter(Trip.id==id).first()
        if not trip:
            return {'error': 'Trip not found'}, 404
        trip_dict=trip.to_dict()
        response=make_response(trip_dict, 200)
        return response

    def patch(self, id):
        trip = Trip.query.filter(Trip.id==id).first()
        if not trip:
            return {'error': 'Trip not found'}, 404
        data = request.json
        if 'destination' in data:
            trip.destination = data['destination']
        if 'start_date' in data:
            trip.start_date = datetime.strptime(data["start_date"], "%Y-%m-%d").date()
        if 'end_date' in data:
            trip.end_date = datetime.strptime(data["end_date"], "%Y-%m-%d").date()

        if 'details' in data:
            trip.details = data['details']

        db.session.commit()
        trip_dict= trip.to_dict()
        response=make_response(trip_dict, 200)
        return response

    def delete(self, id):
        trip = Trip.query.filter(Trip.id==id).first()
        if not trip:
            return {'error': 'Trip not found'}, 404
        db.session.delete(trip)
        db.session.commit()
        response_body={
            "message": "Trip deleted successfully"
        }
            
        response=make_response(response_body, 204)
        return response


class TravelGroupResource(Resource):
    def get(self):
        travelgroups = [tg.to_dict() for tg in TravelGroup.query.all()]
        response = make_response(travelgroups, 200)
        return response

    def post(self):
        data = request.get_json()
        new_travelgroup = TravelGroup(
            group_name=data.get('group_name'),
            max_members=data.get('max_members'),
            trip_id=data.get('trip_id') 

        )

        db.session.add(new_travelgroup)
        db.session.commit()

        new_tg_dict = new_travelgroup.to_dict()
        response = make_response(new_tg_dict, 201)
        return response


class TravelGroupResourceById(Resource):
    def get(self, id):
        travelgroup = TravelGroup.query.get(id)
        if not travelgroup:
            return {"error": "TravelGroup not found"}, 404

        tg_dict = travelgroup.to_dict()
        response = make_response(tg_dict, 200)
        return response

    def patch(self, id):
        travelgroup = TravelGroup.query.get(id)
        if not travelgroup:
            return {"error": "TravelGroup not found"}, 404

        data = request.get_json()
        if 'group_name' in data:
            travelgroup.group_name = data['group_name']
        if 'max_members' in data:
            travelgroup.max_members = data['max_members']
        if 'trip_id' in data:  
            travelgroup.trip_id = data['trip_id']

        db.session.commit()
        tg_dict = travelgroup.to_dict()
        response = make_response(tg_dict, 200)
        return response

    def delete(self, id):
        travelgroup = TravelGroup.query.get(id)
        if not travelgroup:
            return {"error": "TravelGroup not found"}, 404

        db.session.delete(travelgroup)
        db.session.commit()

        response_body = {"message": "TravelGroup deleted successfully"}
        response = make_response(response_body, 200)
        return response

class GroupMembershipResource(Resource):
    def get(self):
        groupmemberships=[groupmembership.to_dict() for groupmembership in GroupMembership.query.all()]
        response=make_response(groupmemberships, 200)
        return response
    def post(self):

        data = request.get_json()
        new_groupmembership = GroupMembership(
        is_active=data.get('is_active', True),
        user_id=data['user_id'],
        group_id=data['group_id']  
    )

        db.session.add(new_groupmembership)
        db.session.commit()

        new_groupmembership_dict = new_groupmembership.to_dict()
        response = make_response(new_groupmembership_dict, 201)
        return response
class GroupMembershipById(Resource):
    def get(self, id):
        gm = GroupMembership.query.filter_by(id=id).first()
        if not gm:
            return {"error": "Group membership not found"}, 404

        return make_response(gm.to_dict(), 200)

    def patch(self, id):
        gm = GroupMembership.query.filter_by(id=id).first()
        if not gm:
            return {"error": "Group membership not found"}, 404

        data = request.get_json()
        if 'is_active' in data:
            gm.is_active = data['is_active']

        db.session.commit()
        return make_response(gm.to_dict(), 200)


api.add_resource(Start, '/welcome')
api.add_resource(UserResource, '/users')
api.add_resource(UserResourceById, '/users/<int:id>')
api.add_resource(TripResource, '/trips')
api.add_resource(TripResourceById, '/trips/<int:id>')
api.add_resource(TravelGroupResource, '/travelgroups')
api.add_resource(TravelGroupResourceById, '/travelgroups/<int:id>')
api.add_resource(GroupMembershipResource, '/groupmemberships')
api.add_resource(GroupMembershipById, '/groupmemberships/<int:id>')
api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')







if __name__ == '__main__':
    app.run(port=5555, debug=True)

# kill -9 $(lsof -t -i:5555)