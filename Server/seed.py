#!/usr/bin/env python3
# server/seed.py
from random import choice as rc
from faker import Faker

from app import app
from models import db, User, Trip, TravelGroup, GroupMembership

with app.app_context():

    fake = Faker()

    User.query.delete()
    Trip.query.delete()
    TravelGroup.query.delete()
    GroupMembership.query.delete()

    users=[]
    trips=[]
    travelgroups=[]
    groupmemberships=[]