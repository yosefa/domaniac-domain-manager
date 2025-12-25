// Get all domains for authenticated user
import { verifyToken, extractToken } from '../../utils/auth';

interface Env {
    DB: D1Database;
    JWT_SECRET: string;
}

export async function onRequestGet(context: { request: Request; env: Env }) {
    const { request, env } = context;

    try {
        const token = extractToken(request);

        if (!token) {
            return new Response(
                JSON.stringify({ error: 'Authentication required' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Verify token
        const payload = await verifyToken(token, env.JWT_SECRET);

        // Get user's domains
        const { results } = await env.DB.prepare(
            'SELECT id, name, registrar, expiry_date, price, currency, auto_renew, notes, tags FROM domains WHERE user_id = ? ORDER BY expiry_date ASC'
        ).bind(payload.userId).all();

        // Parse tags from JSON string
        const domains = results.map(domain => ({
            ...domain,
            expiryDate: domain.expiry_date,
            autoRenew: domain.auto_renew === 1,
            tags: JSON.parse(domain.tags as string || '[]')
        }));

        return new Response(
            JSON.stringify({ success: true, domains }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Get domains error:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch domains', message: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
