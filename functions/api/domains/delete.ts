// Delete domain
import { verifyToken, extractToken } from '../../utils/auth';

interface Env {
    DB: D1Database;
    JWT_SECRET: string;
}

export async function onRequestDelete(context: { request: Request; env: Env }) {
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

        const url = new URL(request.url);
        const id = url.searchParams.get('id');

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

        // Delete domain
        await env.DB.prepare(
            'DELETE FROM domains WHERE id = ?'
        ).bind(id).run();

        return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Delete domain error:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to delete domain', message: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
