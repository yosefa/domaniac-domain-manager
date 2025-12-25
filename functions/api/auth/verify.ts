// Token verification endpoint
import { verifyToken, extractToken } from '../../utils/auth';

interface Env {
    JWT_SECRET: string;
}

export async function onRequestGet(context: { request: Request; env: Env }) {
    const { request, env } = context;

    try {
        const token = extractToken(request);

        if (!token) {
            return new Response(
                JSON.stringify({ error: 'No token provided' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Verify token
        const payload = await verifyToken(token, env.JWT_SECRET);

        return new Response(
            JSON.stringify({
                success: true,
                user: {
                    id: payload.userId,
                    email: payload.email
                }
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Invalid or expired token' }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
