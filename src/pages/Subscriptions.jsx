import React from 'react';
import SubscriptionCard from '../components/SubscriptionCard';

const Subscriptions = () => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Subscriptions</h2>
    <SubscriptionCard name="Netflix" amount="₹500" />
    <SubscriptionCard name="Spotify" amount="₹199" />
  </div>
);

export default Subscriptions;
