// Login endpoint
import { generateToken, verifyPassword } from '../../utils/auth';

interface Env {
    DB: D1Database;
    JWT_SECRET: string;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
    const { request, env } = context;

    try {
        const { email, password } = await request.json();

        // Validation
        if (!email || !password) {
            return new Response(
                JSON.stringify({ error: 'Email and password are required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Find user
        const user = await env.DB.prepare(
            'SELECT id, email, password_hash FROM users WHERE email = ?'
        ).bind(email.toLowerCase()).first();

        if (!user) {
            return new Response(
                JSON.stringify({ error: 'Invalid email or password' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Verify password
        const isValidPassword = await verifyPassword(password, user.password_hash as string);

        if (!isValidPassword) {
            return new Response(
                JSON.stringify({ error: 'Invalid email or password' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Generate JWT token
        const token = await generateToken(
            { userId: user.id, email: user.email },
            env.JWT_SECRET,
            '24h'
        );

        return new Response(
            JSON.stringify({
                success: true,
                token,
                user: {
                    id: user.id,
                    email: user.email
                }
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Login error:', error);
        return new Response(
            JSON.stringify({ error: 'Login failed', message: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
