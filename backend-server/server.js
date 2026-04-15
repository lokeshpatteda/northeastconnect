require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const upload = require('./src/middleware/upload');
const supabase = require('./src/supabaseClient');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Socket.io Connection
io.on('connection', (socket) => {
    console.log('User connected to live feedback session:', socket.id);
    socket.on('disconnect', () => {
        console.log('User disconnected from live session');
    });
});

// --- Routes ---

app.get('/', (req, res) => {
    res.json({
        status: 'online',
        database: 'Supabase connected',
        message: 'NECA Production Backend is fully SQL-integrated',
        endpoints: ['/api/memberships', '/api/contacts'],
        realtime: 'Socket.io active'
    });
});

// 1. Memberships
app.get('/api/memberships', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('memberships')
            .select('*')
            .order('date', { ascending: false });
        
        if (error) throw error;
        res.json(data);
    } catch (err) {
        console.error('Membership Fetch Error:', err);
        res.status(500).json({ error: 'Failed to fetch memberships' });
    }
});

app.post('/api/memberships', upload.single('profileImage'), async (req, res) => {
    try {
        const submission = req.body;
        const imageUrl = req.file ? `http://localhost:${PORT}/uploads/${req.file.filename}` : null;
        
        const newSubmission = {
            ...submission,
            date: new Date().toISOString(),
            status: 'pending',
            image_url: imageUrl
        };

        const { data, error } = await supabase.from('memberships').insert([newSubmission]).select();
        if (error) throw error;

        io.emit('new-membership', data[0]);
        res.status(201).json(data[0]);
    } catch (err) {
        console.error('Membership Save Error:', err);
        res.status(500).json({ error: 'Failed to save membership' });
    }
});

app.patch('/api/memberships/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const { data, error } = await supabase
            .from('memberships')
            .update({ status })
            .eq('id', req.params.id)
            .select();

        if (error) throw error;
        io.emit('membership-updated', data[0]);
        res.json(data[0]);
    } catch (err) {
        console.error('Membership Update Error:', err);
        res.status(500).json({ error: 'Failed to update membership' });
    }
});

app.delete('/api/memberships/:id', async (req, res) => {
    try {
        const { error } = await supabase
            .from('memberships')
            .delete()
            .eq('id', req.params.id);

        if (error) throw error;
        io.emit('membership-deleted', req.params.id);
        res.status(204).send();
    } catch (err) {
        console.error('Membership Delete Error:', err);
        res.status(500).json({ error: 'Failed to delete membership' });
    }
});

// 2. Contacts
app.get('/api/contacts', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('contacts')
            .select('*')
            .order('date', { ascending: false });
        
        if (error) throw error;
        res.json(data);
    } catch (err) {
        console.error('Contact Fetch Error:', err);
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
});

app.post('/api/contacts', upload.single('attachment'), async (req, res) => {
    try {
        const submission = req.body;
        const imageUrl = req.file ? `http://localhost:${PORT}/uploads/${req.file.filename}` : null;

        const newSubmission = {
            ...submission,
            date: new Date().toISOString(),
            status: 'new',
            image_url: imageUrl
        };

        const { data, error } = await supabase.from('contacts').insert([newSubmission]).select();
        if (error) throw error;

        io.emit('new-contact', data[0]);
        res.status(201).json(data[0]);
    } catch (err) {
        console.error('Contact Save Error:', err);
        res.status(500).json({ error: 'Failed to save contact' });
    }
});

app.patch('/api/contacts/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const { data, error } = await supabase
            .from('contacts')
            .update({ status })
            .eq('id', req.params.id)
            .select();

        if (error) throw error;
        io.emit('contact-updated', data[0]);
        res.json(data[0]);
    } catch (err) {
        console.error('Contact Update Error:', err);
        res.status(500).json({ error: 'Failed to update contact' });
    }
});

app.delete('/api/contacts/:id', async (req, res) => {
    try {
        const { error } = await supabase
            .from('contacts')
            .delete()
            .eq('id', req.params.id);

        if (error) throw error;
        io.emit('contact-deleted', req.params.id);
        res.status(204).send();
    } catch (err) {
        console.error('Contact Delete Error:', err);
        res.status(500).json({ error: 'Failed to delete contact' });
    }
});

server.listen(PORT, () => {
    console.log(`PRODUCTION READY: Backend running at http://localhost:${PORT} (SQL Integrated)`);
});
