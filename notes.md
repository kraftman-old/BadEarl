
Spec:
- API that takes GET request with an URL and returns wether it is safe or not
- High number of requests
- Low response time as it is blocking 
- Scalable - both frequency of requests and total number of stored URLs
- Able to handle 5k URL updates a day

Considerations:
- Iterate
- Check in often
- Show how you solve it
- Communication
- Show testing 

Existing products:

Google's lookup service:
API spec: https://developers.google.com/safe-browsing/v4/
Client: https://github.com/google/safebrowsing



Future considerations:
- Ratelimiting per account (have them pass a key)
- URLs that are already the maximum length before being appended to our URL (have them POST them instead)
- Let them specify what kind of threat they want to know about
- Allow marking updating URLs to mark them as safe again