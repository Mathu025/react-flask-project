#!/usr/bin/env python3
# server/seed.py
# seed.py
#!/usr/bin/env python3

from app import app, db
from models import User, Trip, TravelGroup, GroupMembership
from datetime import date

def seed_database():
    with app.app_context():
        print("Clearing existing data...")
        GroupMembership.query.delete()
        TravelGroup.query.delete()
        Trip.query.delete()
        User.query.delete()
        
    
        # Create users with proper password setting
        users = [
            User(
                name="Alice Johnson", 
                email="alice@example.com", 
                role="user",
                profile_pic="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
            ),
            User(
                name="Bob Smith", 
                email="bob@example.com", 
                role="user",
                profile_pic="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            ),
            User(
                name="Carol Davis", 
                email="carol@example.com", 
                role="user",
                profile_pic="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
            ),
            User(
                name="David Wilson", 
                email="david@example.com", 
                role="user",
                profile_pic="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            ),
            User(
                name="Admin User", 
                email="admin@travelbuddy.com", 
                role="admin",
                profile_pic="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
            )
        ]
        
        # Set passwords for each user
        for user in users:
            user.password = "password123"  # This will hash the password
        
        db.session.add_all(users)
        db.session.commit()
        
        # Create trips
        trips = [
            Trip(
                destination="Paris, France",
                start_date=date(2024, 6, 1),
                end_date=date(2024, 6, 10),
                details="Romantic getaway to the city of lights. Visiting Eiffel Tower, Louvre Museum, and enjoying French cuisine.",
                user_id=users[0].id  # Alice's trip
            ),
            Trip(
                destination="Tokyo, Japan",
                start_date=date(2024, 7, 15),
                end_date=date(2024, 7, 25),
                details="Cultural adventure exploring Tokyo's temples, sushi restaurants, and bullet train experience.",
                user_id=users[1].id  # Bob's trip
            ),
            Trip(
                destination="Bali, Indonesia",
                start_date=date(2024, 8, 5),
                end_date=date(2024, 8, 15),
                details="Beach vacation with surfing lessons, temple visits, and relaxing spa treatments.",
                user_id=users[2].id  # Carol's trip
            ),
            Trip(
                destination="New York, USA",
                start_date=date(2024, 9, 10),
                end_date=date(2024, 9, 20),
                details="City exploration including Broadway shows, Central Park, and museum visits.",
                user_id=users[3].id  # David's trip
            ),
            Trip(
                destination="Santorini, Greece",
                start_date=date(2024, 10, 1),
                end_date=date(2024, 10, 8),
                details="Island getaway with stunning sunsets, wine tasting, and beach relaxation.",
                user_id=users[0].id  # Alice's second trip
            )
        ]
        
        db.session.add_all(trips)
        db.session.commit()
        

        
        # Create travel groups
        travel_groups = [
            TravelGroup(
                group_name="Paris Explorers 2024",
                max_members=8,
                trip_id=trips[0].id
            ),
            TravelGroup(
                group_name="Japan Adventure Squad",
                max_members=12,
                trip_id=trips[1].id
            ),
            TravelGroup(
                group_name="Bali Beach Club",
                max_members=10,
                trip_id=trips[2].id
            ),
            TravelGroup(
                group_name="NYC City Lovers",
                max_members=15,
                trip_id=trips[3].id
            ),
            TravelGroup(
                group_name="Santorini Sunset Chasers",
                max_members=6,
                trip_id=trips[4].id
            )
        ]
        
        db.session.add_all(travel_groups)
        db.session.commit()
        
        
        # Create group memberships
        memberships = [
            # Paris Explorers Group (Trip 1)
            GroupMembership(user_id=users[0].id, group_id=travel_groups[0].id, is_active=True),  # Alice - creator
            GroupMembership(user_id=users[1].id, group_id=travel_groups[0].id, is_active=True),  # Bob
            GroupMembership(user_id=users[2].id, group_id=travel_groups[0].id, is_active=True),  # Carol
            
            # Japan Adventure Squad (Trip 2)
            GroupMembership(user_id=users[1].id, group_id=travel_groups[1].id, is_active=True),  # Bob - creator
            GroupMembership(user_id=users[0].id, group_id=travel_groups[1].id, is_active=True),  # Alice
            GroupMembership(user_id=users[3].id, group_id=travel_groups[1].id, is_active=True),  # David
            
            # Bali Beach Club (Trip 3)
            GroupMembership(user_id=users[2].id, group_id=travel_groups[2].id, is_active=True),  # Carol - creator
            GroupMembership(user_id=users[1].id, group_id=travel_groups[2].id, is_active=True),  # Bob
            
            # NYC City Lovers (Trip 4)
            GroupMembership(user_id=users[3].id, group_id=travel_groups[3].id, is_active=True),  # David - creator
            GroupMembership(user_id=users[0].id, group_id=travel_groups[3].id, is_active=True),  # Alice
            GroupMembership(user_id=users[2].id, group_id=travel_groups[3].id, is_active=True),  # Carol
            GroupMembership(user_id=users[4].id, group_id=travel_groups[3].id, is_active=True),  # Admin
            
            # Santorini Sunset Chasers (Trip 5)
            GroupMembership(user_id=users[0].id, group_id=travel_groups[4].id, is_active=True),  # Alice - creator
            GroupMembership(user_id=users[2].id, group_id=travel_groups[4].id, is_active=True),  # Carol
            GroupMembership(user_id=users[3].id, group_id=travel_groups[4].id, is_active=True),  # David
            
            # Inactive membership example
            GroupMembership(user_id=users[4].id, group_id=travel_groups[0].id, is_active=False),  # Admin (inactive)
        ]
        
        db.session.add_all(memberships)
        db.session.commit()
    

        print("Database seeding completed successfully!")
        print(" Seeding Summary:")
        print(f"   Users: {len(users)}")
        print(f"   Trips: {len(trips)}")
        print(f"   Travel Groups: {len(travel_groups)}")
        print(f"   Group Memberships: {len(memberships)}")
        
        print("\n Test User Logins:")
        print("   User: alice@example.com / Password: password123")
        print("   User: bob@example.com / Password: password123")
        print("   User: admin@travelbuddy.com / Password: password123")

if __name__ == "__main__":
    seed_database()