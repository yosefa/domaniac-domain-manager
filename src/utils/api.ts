// API utility functions for domain management

export const getAuthToken = (): string | null => {
    return localStorage.getItem('auth_token');
};

export const apiRequest = async (url: string, options: RequestInit = {}) => {
    const token = getAuthToken();

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('auth_token');
        window.location.reload();
        throw new Error('Authentication required');
    }

    return response;
};

// Domain API functions
export const fetchDomains = async () => {
    const response = await apiRequest('/api/domains/list');
    if (!response.ok) {
        throw new Error('Failed to fetch domains');
    }
    const data = await response.json();
    return data.domains;
};

export const createDomain = async (domainData: any) => {
    const response = await apiRequest('/api/domains/create', {
        method: 'POST',
        body: JSON.stringify(domainData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create domain');
    }

    const data = await response.json();
    return data.domain;
};

export const updateDomain = async (id: string, domainData: any) => {
    const response = await apiRequest('/api/domains/update', {
        method: 'PUT',
        body: JSON.stringify({ id, ...domainData }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update domain');
    }

    const data = await response.json();
    return data.domain;
};

export const deleteDomain = async (id: string) => {
    const response = await apiRequest(`/api/domains/delete?id=${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete domain');
    }

    return true;
};
