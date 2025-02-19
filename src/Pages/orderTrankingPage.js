import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Package, Truck, MapPin, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import '../Styles/track.css'; // Import CSS file

const TrackingPage = () => {
  const { awbNumber } = useParams();
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrackingDetails = async () => {
      try {
        const response = await fetch(`https://backend-wzk0.onrender.com/api/shiprocket/track/${awbNumber}`);
        const data = await response.json();
        
        if (response.ok) {
          setTrackingData(data);
        } else {
          setError(data.error || 'Failed to fetch tracking information');
        }
      } catch (error) {
        setError('Unable to connect to tracking service');
      } finally {
        setLoading(false);
      }
    };

    if (awbNumber) {
      fetchTrackingDetails();
    }
  }, [awbNumber]);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="icon delivered" />;
      case 'in transit':
        return <Truck className="icon in-transit" />;
      case 'out for delivery':
        return <Package className="icon out-for-delivery" />;
      case 'pending':
        return <Clock className="icon pending" />;
      default:
        return <Package className="icon default" />;
    }
  };

  if (loading) {
    return (
      <div className="loader">
        <div></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="card error-container">
          <AlertCircle className="error-icon" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        {/* Header */}
        <div className="header-track">
          <h1>Tracking Details</h1>
          <p>AWB: {awbNumber}</p>
        </div>

        {/* Current Status */}
        <div className="status-container">
          <div className="status-text">
            <h2>Current Status</h2>
            <p>{trackingData?.current_status || 'Status not available'}</p>
          </div>
          {getStatusIcon(trackingData?.current_status)}
        </div>

        {/* Tracking Timeline */}
        <div className="tracking-history">
          <h3>Tracking History</h3>
          {trackingData?.tracking_data?.map((event, index) => (
            <div key={index} className="tracking-item">
              <div className="tracking-icon">
                <MapPin className="icon" />
              </div>
              <div className="tracking-text">
                <h4>{event.status}</h4>
                <p>{event.activity}</p>
                <div className="details">
                  <span>{event.location}</span> • <span>{new Date(event.date).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;
