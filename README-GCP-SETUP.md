## GCP SETUP

### Bucket

**1. Create Service Account:**

    gcloud iam service-accounts create [project]-app --display-name="[project]-app" --project [project]-gcp
    gcloud projects add-iam-policy-binding [project]-gcp --member="serviceAccount:[service_account_email]" --role="roles/storage.admin"
    gcloud iam service-accounts keys create --iam-account=[service_account_email] gcp.json

**2. Create Bucket:**

    1. Go to Cloud Storage
    2. Create a new bucket
    3. Set bucket name (e.g. [project]-app-stag)
    4. Choose Location Type (e.g. Multi-region)
    5. Choose Standard default storage class
    6. Choose Uniform access control
    7. Uncheck the box "Enforce public access prevention on this bucket"

**3. Set Bucket Permissions:**

    1. Go to "PERMISSIONS" tab
    2. Click "GRANT ACCESS"
    3. Add "allUsers" in New principals
    4. Select role "Storage Object Viewer"
    5. Click "SAVE"

**4. Configure Bucket for Web App Hosting:**

    1. Click "Settings" and select "Edit website configuration"
    2. Set Main page (index.html) to "index.html"
    3. Set Error page (404.html) to "index.html"
    4. Click "Save"

### Load Balancer

**5. Configure Load Balancer:**

    1. Click "Create Load Balancer"
        - Under "Application Load Balancer (HTTP/HTTPS)"
        - Go with all defaults for the load balancer configuration
    2. Set name for the load balancer (e.g. "app-stag-lb")
    3. Frontend configuration
        - Frontend IP name: (e.g. app-stag-fe)
        - Protocol: Select HTTPS
        - IPv4: Create a new IP Address (e.g. app-stag-ip)
        - Port: 443
        - Create SSL Certificate (e.g. app-stag-ssl)
        - Enable HTTP to HTTPS redirect
    4. Backend configuration
        - Create a backend bucket ([project]-app-stag-be)
        - Select the bucket created earlier (e.g. [project]-app-stag)
        - Enable Cloud CDN
        - Cache mode: Use origin settings based on Cache-Control headers
    5. Routing rules
        - Simple host and path rule
    6. Review configuration
    7. Click "Create"

### DNS

**6. Subdomain**

    Create a subdomain with an A record to the IP

###  Products

**7. Favorite**

    - Billing
    - IAM & Admin
    - APIs & Services
    - Network Services
    - VPC Network
    - Cloud Storage
    - Kubernetes Engine
    - Cloud SQL
    - Google Auth Platform
