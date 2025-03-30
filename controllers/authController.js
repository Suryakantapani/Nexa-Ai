const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client("YOUR_GOOGLE_CLIENT_ID");

exports.signup = async (req, res) => {
    try {
        const { name, email, phone, dob, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, phone, dob, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
        res.json({ message: 'Login successful!', token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

exports.googleAuth = async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({ idToken: token, audience: "YOUR_GOOGLE_CLIENT_ID" });
        const { name, email } = ticket.getPayload();
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ name, email, phone: '', dob: '', password: '' });
            await user.save();
        }
        const jwtToken = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
        res.json({ message: 'Google Authentication successful!', token: jwtToken });
    } catch (error) {
        res.status(500).json({ error: 'Google authentication failed' });
    }
};