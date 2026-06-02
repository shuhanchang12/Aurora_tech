.PHONY: train serve docker-build docker-run

train:
	python src/train_model.py

serve:
	uvicorn api.app:app --reload --host 0.0.0.0 --port 8000

docker-build:
	docker build -t auroratech-ai-api:latest .

docker-run:
	docker run -p 8000:8000 auroratech-ai-api:latest
