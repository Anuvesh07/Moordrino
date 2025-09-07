#!/usr/bin/env python3
"""
Simple test script to verify the backend API works
Run this after starting the Flask server to test the /send_morse endpoint
"""

import requests
import json

def test_backend():
    """Test the backend API endpoints"""
    base_url = "http://localhost:5000"
    
    print("Testing Morse Code LED Backend API...")
    print("=" * 50)
    
    # Test health endpoint
    try:
        response = requests.get(f"{base_url}/health")
        if response.status_code == 200:
            print("✓ Health check passed")
            print(f"  Response: {response.json()}")
        else:
            print("✗ Health check failed")
            return
    except requests.exceptions.ConnectionError:
        print("✗ Cannot connect to backend server")
        print("  Make sure the Flask server is running on localhost:5000")
        return
    
    # Test send_morse endpoint with sample data
    test_morse = "... --- ..."  # SOS in Morse code
    test_data = {"morse_code": test_morse}
    
    try:
        response = requests.post(
            f"{base_url}/send_morse",
            headers={"Content-Type": "application/json"},
            data=json.dumps(test_data)
        )
        
        if response.status_code == 200:
            print("✓ Morse code endpoint test passed")
            print(f"  Sent: {test_morse}")
            print(f"  Response: {response.json()}")
        else:
            print("✗ Morse code endpoint test failed")
            print(f"  Status: {response.status_code}")
            print(f"  Response: {response.text}")
            
    except Exception as e:
        print(f"✗ Error testing morse endpoint: {e}")
    
    print("\nTest completed!")

if __name__ == "__main__":
    test_backend()