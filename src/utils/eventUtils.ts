export const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  };
  
export const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const getEventColor = (eventType: string) => {
    switch (eventType) {
        case 'workshop':
        return { tag: 'bg-green-700', background: 'bg-green-100' };
        case 'tech_talk':
        return { tag: 'bg-blue-500', background: 'bg-blue-100' };
        case 'activity':
        return { tag: 'bg-red-500', background: 'bg-red-100' };
        default:
        return { tag: 'bg-secondary', background: 'bg-secondary-light' };
    }
};