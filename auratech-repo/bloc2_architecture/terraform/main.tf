# Simulated Cloud Infrastructure (AWS) for Aurora Tech Data Platform
provider "aws" {
  region = "eu-west-3" # Paris Region
}

resource "aws_db_instance" "auroratech_dw" {
  allocated_storage    = 100
  engine               = "postgres"
  engine_version       = "15.3"
  instance_class       = "db.t3.large"
  db_name              = "auroratech_chromebook_dw"
  username             = "auroratech_admin"
  password             = "TechMargin2026!"
  skip_final_snapshot  = true
  publicly_accessible  = false

  tags = {
    Environment = "Production"
    Project     = "Atomic-Link"
  }
}

resource "aws_s3_bucket" "auroratech_data_lake" {
  bucket = "auroratech-europe-datalake"
}

resource "aws_s3_bucket_lifecycle_configuration" "datalake_lifecycle" {
  bucket = aws_s3_bucket.auroratech_data_lake.id

  rule {
    id     = "archive-financial-audit"
    status = "Enabled"

    transition {
      days          = 1825 # 5 years
      storage_class = "GLACIER"
    }

    expiration {
      days = 3650 # 10 years permanent purge
    }
  }
}
