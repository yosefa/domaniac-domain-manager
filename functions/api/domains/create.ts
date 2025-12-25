// Create new domain
import { verifyToken, extractToken } from '../../utils/auth';

interface Env {
    DB: D1Database;
    JWT_SECRET: string;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
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

        const domainData = await request.json();

        // Validation
        if (!domainData.name || !domainData.registrar || !domainData.expiryDate) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields: name, registrar, expiryDate' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Create domain
        const domainId = crypto.randomUUID();
        const now = Date.now();

        await env.DB.prepare(
            `INSERT INTO domains (
        id, user_id, name, registrar, expiry_date, price, currency, 
        auto_renew, notes, tags, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
            domainId,
            payload.userId,
            domainData.name,
            domainData.registrar,
            domainData.expiryDate,
            domainData.price || 0,
            domainData.currency || 'USD',
            domainData.autoRenew ? 1 : 0,
            domainData.notes || null,
            JSON.stringify(domainData.tags || []),
            now,
            now
        ).run();

        return new Response(
            JSON.stringify({
                success: true,
                domain: {
                    id: domainId,
                    ...domainData
                }
            }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Create domain error:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to create domain', message: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
