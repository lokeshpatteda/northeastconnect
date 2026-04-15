export interface MembershipData {
    id: string;
    name: string;
    email: string;
    phone: string;
    city: string;
    occupation: string;
    membership: string;
    message: string;
    date: string;
    status: 'pending' | 'approved' | 'rejected';
    image_url?: string;
}

export interface ContactData {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    date: string;
    status: 'new' | 'read' | 'replied';
    image_url?: string;
}

const API_BASE = `${import.meta.env.VITE_API_URL}/api`;

export const DataService = {
    // Membership Methods
    getMemberships: async (): Promise<MembershipData[]> => {
        try {
            const response = await fetch(`${API_BASE}/memberships`);
            return await response.json();
        } catch (error) {
            console.error("Fetch Memberships Error:", error);
            return [];
        }
    },

    saveMembership: async (submission: Omit<MembershipData, 'id' | 'date' | 'status'>) => {
        const response = await fetch(`${API_BASE}/memberships`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submission)
        });
        return await response.json();
    },

    // Contact Methods
    getContacts: async (): Promise<ContactData[]> => {
        try {
            const response = await fetch(`${API_BASE}/contacts`);
            return await response.json();
        } catch (error) {
            console.error("Fetch Contacts Error:", error);
            return [];
        }
    },

    saveContact: async (submission: Omit<ContactData, 'id' | 'date' | 'status'>) => {
        const response = await fetch(`${API_BASE}/contacts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submission)
        });
        return await response.json();
    },

    updateMembershipStatus: async (id: string, status: string) => {
        const response = await fetch(`${API_BASE}/memberships/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        return await response.json();
    },

    deleteMembership: async (id: string) => {
        const response = await fetch(`${API_BASE}/memberships/${id}`, {
            method: 'DELETE'
        });
        return response.ok;
    },

    deleteContact: async (id: string) => {
        const response = await fetch(`${API_BASE}/contacts/${id}`, {
            method: 'DELETE'
        });
        return response.ok;
    },

    updateContactStatus: async (id: string, status: string) => {
        const response = await fetch(`${API_BASE}/contacts/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        return await response.json();
    }
};
