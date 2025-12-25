// Public settings endpoint
interface Env {
    REGISTRATION_ENABLED: string;
}

export async function onRequestGet(context: { request: Request; env: Env }) {
    const { env } = context;

    const registrationEnabled = env.REGISTRATION_ENABLED === 'true';

    return new Response(
        JSON.stringify({
            registrationEnabled
        }),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        }
    );
}
