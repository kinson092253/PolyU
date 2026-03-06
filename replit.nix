{ pkgs }: {
  deps = [
    pkgs.python311
    pkgs.python311Packages.pip
    pkgs.python311Packages.flask
    pkgs.python311Packages.flask-cors
    pkgs.python311Packages.psycopg2
    pkgs.python311Packages.requests
    pkgs.python311Packages.flask-sqlalchemy
    pkgs.python311Packages.werkzeug
    pkgs.python311Packages.python-dotenv
    pkgs.python311Packages.gunicorn
    pkgs.postgresql
  ];
}
