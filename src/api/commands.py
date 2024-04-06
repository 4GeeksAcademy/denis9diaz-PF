
import click
from api.models import db, User, Cities, Status, Treasures_Hide, Treasures_Founded

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""

statuses = [{"name": "Amateur","points": {"points_min": 0, "points_max":99}},
            {"name": "Bronze" , "points":{"points_min": 100, "points_max":199}},
            {"name": "Silver", "points":{"points_min": 200, "points_max":299}},
            {"name": "Gold", "points":{"points_min": 300, "points_max":499}},
            {"name": "Platinum", "points":{"points_min": 500, "points_max":699}},
            {"name": "Diamond", "points":{"points_min": 700, "points_max":999}},
            {"name": "Legendary", "points":{"points_min": 1000, "points_max":None}},]

cities = [{"name": "Madrid"},
          {"name": "Barcelona"},
          {"name": "Sevilla"},
          {"name": "Valencia"},
          {"name": "Bilbao"},
          {"name": "Galicia"},
          {"name": "Lanzarote"},]

def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")

    @app.cli.command("insert-status")
    def insert_status():
        print("Creating Status")
        for x in range(0,len(statuses)):
            status = Status()
            status.name = statuses[x]["name"]
            status.points_min = statuses[x]["points"]["points_min"]
            status.points_max = statuses[x]["points"]["points_max"]
            db.session.add(status)
            db.session.commit()
            print("Status {} creado!".format(statuses[x]["name"]))
        print("Todos los status creados")

    @app.cli.command("insert-cities")
    def insert_cities():
        print("Creating Cities")
        for x in range(0,len(cities)):
            new_city = Cities()
            new_city.name = cities[x]["name"]
            db.session.add(new_city)
            db.session.commit()
            print("City {} creada!".format(cities[x]["name"]))
        print("Todas las ciudades creadas")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        pass
    