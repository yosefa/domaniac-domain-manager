// Registration endpoint
import { generateToken, hashPassword } from '../../utils/auth';

interface Env {
    DB: D1Database;
    JWT_SECRET: string;
    REGISTRATION_ENABLED: string;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
    const { request, env } = context;

    // Check if registration is enabled
    if (env.REGISTRATION_ENABLED !== 'true') {
        return new Response(
            JSON.stringify({ error: 'Registration is currently disabled' }),
            { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
    }

    try {
        const { email, password } = await request.json();

        // Validation
        if (!email || !password) {
            return new Response(
                JSON.stringify({ error: 'Email and password are required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(
                JSON.stringify({ error: 'Invalid email format' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Password strength validation
        if (password.length < 8) {
            return new Response(
                JSON.stringify({ error: 'Password must be at least 8 characters long' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Check if user already exists
        const existingUser = await env.DB.prepare(
            'SELECT id FROM users WHERE email = ?'
        ).bind(email.toLowerCase()).first();

        if (existingUser) {
            return new Response(
                JSON.stringify({ error: 'User already exists' }),
                { status: 409, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Hash password
        const passwordHash = await hashPassword(password);

        // Create user
        const userId = crypto.randomUUID();
        const now = Date.now();

        await env.DB.prepare(
            'INSERT INTO users (id, email, password_hash, created_at, updated_at) VALUES (?, ?, ?, ?, ?)'
        ).bind(userId, email.toLowerCase(), passwordHash, now, now).run();

        // Generate JWT token
        const token = await generateToken(
            { userId, email: email.toLowerCase() },
            env.JWT_SECRET,
            '24h'
        );

        return new Response(
            JSON.stringify({
                success: true,
                token,
                user: {
                    id: userId,
                    email: email.toLowerCase()
                }
            }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Registration error:', error);
        return new Response(
            JSON.stringify({ error: 'Registration failed', message: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
