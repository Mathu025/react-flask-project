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

    #Creating sample users
    for _ in range(10):
        user = User(
            name=fake.name(),
            email=fake.unique.email(),
            role=rc(["organizer", "traveler"])
        )
        user.password_hash = "password"
        users.append(user)

    db.session.add_all(users)
    db.session.commit()


    

    #Creating sample trips
    for _ in range(10):
        trip = Trip(
            destination=fake.city(),
            start_date=fake.date_between(start_date="today", end_date="+30d"),
            end_date=fake.date_between(start_date="+31d", end_date="+60d"),
            details=fake.sentence(),
            user_id=rc(users).id
        )
        trips.append(trip)

    db.session.add_all(trips)
    db.session.commit()

    #Creating sample travel groups
    for _ in range(10):
        travelgroup = TravelGroup(
            group_name=fake.city() + " Crew",
            max_members=rc([5, 10, 15]),

        )
        travelgroups.append(travelgroup)

        db.session.add_all(travelgroups)
        db.session.commit()
    

    #Creating sample group memberships
    for tg in travelgroups:
        for _ in range(rc([1, 3, 5])):
            user = rc(users)
            gm = GroupMembership(user=user, travelgroup=tg)
            groupmemberships.append(gm)

    db.session.add_all(groupmemberships)
    db.session.commit()
