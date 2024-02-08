setup_backend() {
    echo "Setting up backend..."
    cd backend
    if [ ! -d "venv" ]; then
        python3 -m venv venv
        echo "Virtual environment created."
    fi
    source venv/bin/activate
    pip install -r requirements.txt
    python manage.py migrate
    echo "Django migrations applied."
    cd ..
}

setup_frontend() {
    echo "Setting up frontend..."
    cd frontend
    npm install
    cd ..
}

start_services() {
    echo "Starting services..."
    # Start backend
    cd backend
    source venv/bin/activate
    python manage.py runserver &
    cd ..
    # Start frontend
    cd frontend
    npm start &
    cd ..
}

if [ "$1" = "--setup" ]; then
    setup_backend
    setup_frontend
fi

start_services