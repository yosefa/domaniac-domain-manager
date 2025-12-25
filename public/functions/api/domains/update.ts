// Update existing domain
import { verifyToken, extractToken } from '../../utils/auth';

interface Env {
    DB: D1Database;
    JWT_SECRET: string;
}

export async function onRequestPut(context: { request: Request; env: Env }) {
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

        const { id, ...domainData } = await request.json();

        if (!id) {
            return new Response(
                JSON.stringify({ error: 'Domain ID is required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Verify ownership
        const existingDomain = await env.DB.prepare(
            'SELECT user_id FROM domains WHERE id = ?'
        ).bind(id).first();

        if (!existingDomain) {
            return new Response(
                JSON.stringify({ error: 'Domain not found' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        if (existingDomain.user_id !== payload.userId) {
            return new Response(
                JSON.stringify({ error: 'Unauthorized' }),
                { status: 403, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Update domain
        const now = Date.now();

        await env.DB.prepare(
            `UPDATE domains SET 
        name = ?, registrar = ?, expiry_date = ?, price = ?, currency = ?,
        auto_renew = ?, notes = ?, tags = ?, updated_at = ?
      WHERE id = ?`
        ).bind(
            domainData.name,
            domainData.registrar,
            domainData.expiryDate,
            domainData.price || 0,
            domainData.currency || 'USD',
            domainData.autoRenew ? 1 : 0,
            domainData.notes || null,
            JSON.stringify(domainData.tags || []),
            now,
            id
        ).run();

        return new Response(
            JSON.stringify({
                success: true,
                domain: {
                    id,
                    ...domainData
                }
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Update domain error:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to update domain', message: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
