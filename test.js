let nums = [1, 2, 3, 4, 5]
console.log(nums)
console.log(...nums)


const jwt = require('jsonwebtoken');
const secretKey = 'passkey'; // Or retrieve this from a secure location

function verifyToken(token) {
  try {
    // Decode the token (without verifying the signature yet)
    const decoded = jwt.decode(token, { complete: true });

    // Verify the signature
    const payload = jwt.verify(token, secretKey);

    // At this point, the token is valid
    return payload;
  } catch (error) {
    // If an error occurs during verification, the token is invalid
    console.error('Token verification failed:', error.message);
    return null;
  }
}

// Example usage
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MT2NTZkYWMxMzUzNGZiOWUzMDliZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxMjU3MDgxMywiZXhwIjoxNzEyOTE2NDEzfQ.jsGUyXfmgnu_K8YVy_FO18qn1awKzGprcAz4q9EFWgo';
const verifiedPayload = verifyToken(token);
if (verifiedPayload) {
  console.log('Token is valid. Payload:', verifiedPayload);
} else {
  console.log('Token is invalid.');
}
