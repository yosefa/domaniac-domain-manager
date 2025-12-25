// JWT utilities for Cloudflare Workers
// Using Web Crypto API for JWT operations

export async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    const passwordHash = await hashPassword(password);
    return passwordHash === hash;
}

// Simple JWT implementation using Web Crypto API
export async function generateToken(payload: any, secret: string, expiresIn: string = '24h'): Promise<string> {
    const header = {
        alg: 'HS256',
        typ: 'JWT'
    };

    // Calculate expiration
    const now = Math.floor(Date.now() / 1000);
    const expirationSeconds = expiresIn === '24h' ? 86400 : parseInt(expiresIn);

    const jwtPayload = {
        ...payload,
        iat: now,
        exp: now + expirationSeconds
    };

    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(jwtPayload));

    const signature = await sign(`${encodedHeader}.${encodedPayload}`, secret);

    return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export async function verifyToken(token: string, secret: string): Promise<any> {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid token format');
        }

        const [encodedHeader, encodedPayload, signature] = parts;

        // Verify signature
        const expectedSignature = await sign(`${encodedHeader}.${encodedPayload}`, secret);
        if (signature !== expectedSignature) {
            throw new Error('Invalid signature');
        }

        // Decode payload
        const payload = JSON.parse(base64UrlDecode(encodedPayload));

        // Check expiration
        const now = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < now) {
            throw new Error('Token expired');
        }

        return payload;
    } catch (error) {
        throw new Error(`Token verification failed: ${error.message}`);
    }
}

async function sign(data: string, secret: string): Promise<string> {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );

    const signature = await crypto.subtle.sign(
        'HMAC',
        key,
        encoder.encode(data)
    );

    return base64UrlEncode(signature);
}

function base64UrlEncode(data: string | ArrayBuffer): string {
    let base64: string;

    if (typeof data === 'string') {
        base64 = btoa(data);
    } else {
        const bytes = new Uint8Array(data);
        const binary = String.fromCharCode(...bytes);
        base64 = btoa(binary);
    }

    return base64
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

function base64UrlDecode(data: string): string {
    let base64 = data
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    // Add padding
    while (base64.length % 4) {
        base64 += '=';
    }

    return atob(base64);
}

export function extractToken(request: Request): string | null {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    return authHeader.substring(7);
}
