from flask import Flask, jsonify, request, make_response, session
from flask_migrate import Migrate
from flask_restful import Api, Resource

from models import db, User, Trip,TravelGroup, GroupMembership


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///travelbuddy.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)

@app.route('/demo')
def start():
    message={
        "No":"Yes"
    }
    response=make_response(message, 200)
    return response