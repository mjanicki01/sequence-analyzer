VENV_ACTIVATE="venv/Scripts/activate"

setup_backend() {
    echo "Setting up backend..."
    cd backend
    if [ ! -d "venv" ]; then
        python -m venv venv
        echo "Virtual environment created."
    fi
    source $VENV_ACTIVATE
    pip install -r requirements.txt
    if [ ! -f ".env" ]; then
        echo "Creating .env file..."
        touch .env
        echo "Generating Django secret key..."
        SECRET_KEY=$(python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')
        echo "SECRET_KEY='$SECRET_KEY'" >> .env
        echo "Secret key added to .env file."
    fi
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
    source $VENV_ACTIVATE
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