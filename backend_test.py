#!/usr/bin/env python3
"""
Backend authentication API tests for MARI.A Launch
Tests all auth endpoints: signup, login, me
"""
import requests
import uuid
import jwt
import json
from datetime import datetime

# Base URL from environment
BASE_URL = "https://fast-deploy-33.preview.emergentagent.com/api"

# Test results tracking
test_results = {
    "passed": [],
    "failed": [],
    "total": 0
}

def log_test(name, passed, details=""):
    """Log test result"""
    test_results["total"] += 1
    if passed:
        test_results["passed"].append(name)
        print(f"✅ PASS: {name}")
    else:
        test_results["failed"].append({"name": name, "details": details})
        print(f"❌ FAIL: {name}")
        if details:
            print(f"   Details: {details}")

def generate_unique_email():
    """Generate unique email for testing"""
    return f"test-{uuid.uuid4()}@example.com"

def test_signup_success():
    """Test successful signup with valid data"""
    email = generate_unique_email()
    payload = {
        "name": "Maria Test User",
        "email": email,
        "password": "securepass123"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/signup", json=payload, timeout=10)
        
        if response.status_code != 201:
            log_test("Signup success - status code", False, 
                    f"Expected 201, got {response.status_code}. Response: {response.text}")
            return None
        
        data = response.json()
        
        # Check response structure
        if "token" not in data or "user" not in data:
            log_test("Signup success - response structure", False, 
                    f"Missing token or user in response: {data}")
            return None
        
        user = data["user"]
        required_fields = ["id", "name", "email", "created_at"]
        missing = [f for f in required_fields if f not in user]
        if missing:
            log_test("Signup success - user fields", False, 
                    f"Missing fields in user: {missing}")
            return None
        
        # Verify email is lowercased
        if user["email"] != email.lower():
            log_test("Signup success - email lowercase", False, 
                    f"Email not lowercased. Expected {email.lower()}, got {user['email']}")
            return None
        
        log_test("Signup success - status code", True)
        log_test("Signup success - response structure", True)
        log_test("Signup success - user fields", True)
        log_test("Signup success - email lowercase", True)
        
        return {"email": email, "password": payload["password"], "token": data["token"]}
        
    except Exception as e:
        log_test("Signup success", False, f"Exception: {str(e)}")
        return None

def test_signup_duplicate_email(email, password):
    """Test signup with duplicate email returns 409"""
    payload = {
        "name": "Duplicate User",
        "email": email,
        "password": password
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/signup", json=payload, timeout=10)
        
        if response.status_code == 409:
            log_test("Signup duplicate email - 409 status", True)
        else:
            log_test("Signup duplicate email - 409 status", False, 
                    f"Expected 409, got {response.status_code}. Response: {response.text}")
    except Exception as e:
        log_test("Signup duplicate email", False, f"Exception: {str(e)}")

def test_signup_duplicate_email_case_insensitive(email, password):
    """Test signup with duplicate email (different case) returns 409"""
    payload = {
        "name": "Duplicate User Uppercase",
        "email": email.upper(),  # Use uppercase version
        "password": password
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/signup", json=payload, timeout=10)
        
        if response.status_code == 409:
            log_test("Signup duplicate email (case-insensitive) - 409 status", True)
        else:
            log_test("Signup duplicate email (case-insensitive) - 409 status", False, 
                    f"Expected 409, got {response.status_code}. Response: {response.text}")
    except Exception as e:
        log_test("Signup duplicate email (case-insensitive)", False, f"Exception: {str(e)}")

def test_signup_invalid_email():
    """Test signup with invalid email format returns 422"""
    payload = {
        "name": "Invalid Email User",
        "email": "not-an-email",
        "password": "securepass123"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/signup", json=payload, timeout=10)
        
        if response.status_code == 422:
            log_test("Signup invalid email - 422 status", True)
        else:
            log_test("Signup invalid email - 422 status", False, 
                    f"Expected 422, got {response.status_code}. Response: {response.text}")
    except Exception as e:
        log_test("Signup invalid email", False, f"Exception: {str(e)}")

def test_signup_short_password():
    """Test signup with password shorter than 6 chars returns 422"""
    payload = {
        "name": "Short Password User",
        "email": generate_unique_email(),
        "password": "12345"  # Only 5 chars
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/signup", json=payload, timeout=10)
        
        if response.status_code == 422:
            log_test("Signup short password - 422 status", True)
        else:
            log_test("Signup short password - 422 status", False, 
                    f"Expected 422, got {response.status_code}. Response: {response.text}")
    except Exception as e:
        log_test("Signup short password", False, f"Exception: {str(e)}")

def test_login_success(email, password):
    """Test successful login with correct credentials"""
    payload = {
        "email": email,
        "password": password
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/login", json=payload, timeout=10)
        
        if response.status_code != 200:
            log_test("Login success - status code", False, 
                    f"Expected 200, got {response.status_code}. Response: {response.text}")
            return None
        
        data = response.json()
        
        # Check response structure
        if "token" not in data or "user" not in data:
            log_test("Login success - response structure", False, 
                    f"Missing token or user in response: {data}")
            return None
        
        log_test("Login success - status code", True)
        log_test("Login success - response structure", True)
        
        return data["token"]
        
    except Exception as e:
        log_test("Login success", False, f"Exception: {str(e)}")
        return None

def test_login_case_insensitive(email, password):
    """Test login with uppercase email (should work due to case-insensitive matching)"""
    payload = {
        "email": email.upper(),
        "password": password
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/login", json=payload, timeout=10)
        
        if response.status_code == 200:
            log_test("Login case-insensitive email - 200 status", True)
        else:
            log_test("Login case-insensitive email - 200 status", False, 
                    f"Expected 200, got {response.status_code}. Response: {response.text}")
    except Exception as e:
        log_test("Login case-insensitive email", False, f"Exception: {str(e)}")

def test_login_wrong_password(email):
    """Test login with wrong password returns 401"""
    payload = {
        "email": email,
        "password": "wrongpassword123"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/login", json=payload, timeout=10)
        
        if response.status_code == 401:
            log_test("Login wrong password - 401 status", True)
        else:
            log_test("Login wrong password - 401 status", False, 
                    f"Expected 401, got {response.status_code}. Response: {response.text}")
    except Exception as e:
        log_test("Login wrong password", False, f"Exception: {str(e)}")

def test_login_nonexistent_email():
    """Test login with non-existent email returns 401"""
    payload = {
        "email": generate_unique_email(),  # Email that doesn't exist
        "password": "anypassword123"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/login", json=payload, timeout=10)
        
        if response.status_code == 401:
            log_test("Login non-existent email - 401 status", True)
        else:
            log_test("Login non-existent email - 401 status", False, 
                    f"Expected 401, got {response.status_code}. Response: {response.text}")
    except Exception as e:
        log_test("Login non-existent email", False, f"Exception: {str(e)}")

def test_me_with_valid_token(token):
    """Test GET /auth/me with valid Bearer token"""
    headers = {
        "Authorization": f"Bearer {token}"
    }
    
    try:
        response = requests.get(f"{BASE_URL}/auth/me", headers=headers, timeout=10)
        
        if response.status_code != 200:
            log_test("GET /auth/me with valid token - status code", False, 
                    f"Expected 200, got {response.status_code}. Response: {response.text}")
            return
        
        data = response.json()
        required_fields = ["id", "name", "email", "created_at"]
        missing = [f for f in required_fields if f not in data]
        
        if missing:
            log_test("GET /auth/me with valid token - user fields", False, 
                    f"Missing fields: {missing}")
        else:
            log_test("GET /auth/me with valid token - status code", True)
            log_test("GET /auth/me with valid token - user fields", True)
            
    except Exception as e:
        log_test("GET /auth/me with valid token", False, f"Exception: {str(e)}")

def test_me_without_token():
    """Test GET /auth/me without Authorization header returns 401"""
    try:
        response = requests.get(f"{BASE_URL}/auth/me", timeout=10)
        
        if response.status_code == 401:
            log_test("GET /auth/me without token - 401 status", True)
        else:
            log_test("GET /auth/me without token - 401 status", False, 
                    f"Expected 401, got {response.status_code}. Response: {response.text}")
    except Exception as e:
        log_test("GET /auth/me without token", False, f"Exception: {str(e)}")

def test_me_with_invalid_token():
    """Test GET /auth/me with malformed/invalid token returns 401"""
    headers = {
        "Authorization": "Bearer invalid-token-12345"
    }
    
    try:
        response = requests.get(f"{BASE_URL}/auth/me", headers=headers, timeout=10)
        
        if response.status_code == 401:
            log_test("GET /auth/me with invalid token - 401 status", True)
        else:
            log_test("GET /auth/me with invalid token - 401 status", False, 
                    f"Expected 401, got {response.status_code}. Response: {response.text}")
    except Exception as e:
        log_test("GET /auth/me with invalid token", False, f"Exception: {str(e)}")

def test_jwt_structure(token):
    """Test JWT token structure and claims"""
    try:
        # Decode without verification to check structure
        decoded = jwt.decode(token, options={"verify_signature": False})
        
        required_claims = ["sub", "email", "exp", "iat"]
        missing = [c for c in required_claims if c not in decoded]
        
        if missing:
            log_test("JWT structure - required claims", False, 
                    f"Missing claims: {missing}. Token payload: {decoded}")
        else:
            log_test("JWT structure - required claims", True)
            
        # Verify algorithm
        header = jwt.get_unverified_header(token)
        if header.get("alg") == "HS256":
            log_test("JWT structure - HS256 algorithm", True)
        else:
            log_test("JWT structure - HS256 algorithm", False, 
                    f"Expected HS256, got {header.get('alg')}")
            
    except Exception as e:
        log_test("JWT structure", False, f"Exception: {str(e)}")

def print_summary():
    """Print test summary"""
    print("\n" + "="*70)
    print("TEST SUMMARY")
    print("="*70)
    print(f"Total tests: {test_results['total']}")
    print(f"Passed: {len(test_results['passed'])}")
    print(f"Failed: {len(test_results['failed'])}")
    print(f"Success rate: {len(test_results['passed'])/test_results['total']*100:.1f}%")
    
    if test_results['failed']:
        print("\n" + "="*70)
        print("FAILED TESTS:")
        print("="*70)
        for failure in test_results['failed']:
            print(f"\n❌ {failure['name']}")
            print(f"   {failure['details']}")
    
    print("\n" + "="*70)

def main():
    """Run all authentication tests"""
    print("="*70)
    print("MARI.A Launch - Backend Authentication API Tests")
    print("="*70)
    print(f"Base URL: {BASE_URL}")
    print("="*70 + "\n")
    
    # Test 1: Successful signup
    print("🔹 Testing signup flow...")
    user_data = test_signup_success()
    
    if not user_data:
        print("⚠️  Signup failed, cannot continue with dependent tests")
        print_summary()
        return
    
    email = user_data["email"]
    password = user_data["password"]
    signup_token = user_data["token"]
    
    # Test 2: Duplicate email
    print("\n🔹 Testing duplicate email rejection...")
    test_signup_duplicate_email(email, password)
    test_signup_duplicate_email_case_insensitive(email, password)
    
    # Test 3: Invalid email format
    print("\n🔹 Testing invalid email format...")
    test_signup_invalid_email()
    
    # Test 4: Short password
    print("\n🔹 Testing short password rejection...")
    test_signup_short_password()
    
    # Test 5: Successful login
    print("\n🔹 Testing login flow...")
    login_token = test_login_success(email, password)
    test_login_case_insensitive(email, password)
    
    # Test 6: Login failures
    print("\n🔹 Testing login failure scenarios...")
    test_login_wrong_password(email)
    test_login_nonexistent_email()
    
    # Test 7: GET /auth/me
    print("\n🔹 Testing /auth/me endpoint...")
    if login_token:
        test_me_with_valid_token(login_token)
    else:
        print("⚠️  Login failed, using signup token for /auth/me tests")
        test_me_with_valid_token(signup_token)
    
    test_me_without_token()
    test_me_with_invalid_token()
    
    # Test 8: JWT structure
    print("\n🔹 Testing JWT token structure...")
    token_to_verify = login_token if login_token else signup_token
    if token_to_verify:
        test_jwt_structure(token_to_verify)
    
    # Print summary
    print_summary()

if __name__ == "__main__":
    main()
