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
Note: You may need to change the `VENV_ACTIVATE` variable depending on how your OS configures the paths for your virtual environment

This script will set up the environment for both the frontend and backend. It installs necessary packages, applies Django migrations, and starts both the Django server and React development server.

## Running the Application

After the initial setup, if you need to start the servers without reinstalling everything, run the following to start the server and client simultaneously:
```
chmod +x start_project.sh
./start_project.sh
```


## Usage

Enter a string of any combination of nucleotides (A, T, C, G). The search results include the name of a protein that contains at least one substring of the search query along with the indices where the substring is located (adjusted from 0-based to 1-based indexing). The search history can be saved in a user's search history. If seearches are made before a user logs in or registers, they will automatically be saved into their search history after submitting the 'register' or 'login' forms. Once logged in, all new searches and their results will be saved. Enjoy!
