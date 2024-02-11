# DNA Sequence Analyzer

This form analyzes if a DNA sequence string exists within a specific [collection of proteins](https://www.ncbi.nlm.nih.gov/sites/myncbi/magda.janicki.1/collections/63742707/public/).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

- Python (with pip)
- Node.js and npm

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Run the setup script:

```
chmod +x start_project.sh
./start_project.sh --setup
```

This script will set up the environment for both the frontend and backend. It sets up a backend .env file, installs necessary packages, applies Django migrations, and starts both the Django server and React development server.

*Note:*
- You may need to change the `VENV_ACTIVATE` variable depending on how your OS configures the paths for your virtual environment (`venv/bin/activate` or `venv/Scripts/activate`)
- You may need to change 'python' to 'python3' in the script depending on which version you're using
- If you were able to successfully setup either the front or backend and not both, use `start_services --setup [frontend/backed]` to selectively try running it again

## Running the Application

After the initial setup, run the following to start the server and client:

```
chmod +x start_project.sh
./start_project.sh
```

*Note:*
- If a port is already in use when starting the project, exit the script and try the following to clear any workers. This might happen while trouble-shooting setup:
  - Powershell:
    - `Stop-Process -Name "python" -Force` (backend)
    - `Stop-Process -Name "node" -Force` (frontend)
  - Bash:
    - `pkill -f node` (backend)
    - `pkill -f python` (frontend)


## Usage

Enter a string of any combination of nucleotides (A, T, C, G). The search results include the name of a protein that contains at least one substring of the search query along with the indices of where the substring is located (adjusted from 0-based to 1-based indexing). The search history can be saved in a user's search history. If searches are made before a user logs in or registers, they will automatically be saved into the user's search history after submitting the 'register' or 'login' forms. Once logged in, all new searches and their results will be saved. Enjoy!
