from app import create_app

servidor = create_app()

if __name__ == "__main__":
    servidor.run(debug=True)