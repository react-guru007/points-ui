"use client"
import React, { useState } from 'react';
import { toast } from "react-toastify";
import { PointsClient } from 'points-client-sdk'

const IndexPage: React.FC = () => {
  const [apiKey, setApiKey] = useState('gwi9nj1hqzdlmlctyg2wkuk55rwic9');
  const [campaignName, setCampaignName] = useState('test_id');
  const [campaignId, setCampaignId] = useState('');
  const [eventName, setEventName] = useState('');
  const [address, setAddress] = useState('');
  const [filterEventName, setFilterEventName] = useState('');
  const [filterAddress, setFilterAddress] = useState('');
  const [points, setPoints] = useState('');
  const [filteredPoints, setFilteredPoints] = useState()

  const handleApiKeySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/api-key`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "campaign_name": campaignName,
        "campaign_id": campaignId
      })
    }).then(res => res.json())
    .then((data) => {
      if (data.id) {
        setApiKey(data.key)
        toast.success(`You are registered successfully`);
        return
      }
      toast.error(`Error in registering api-key`);
      return
    })
  };

  const handleRegisterPointsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pointsClient = new PointsClient({
      apiKey,
      campaignId,
    });
    pointsClient.distribute(eventName, {
      address,
      points,
    })
      .then(() => {
        toast.success('Points distributed successfully');
      })
      .catch((error: any) => {
        toast.error('Error distributing points:', error);
      });
  };

  const handleGetPointsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pointsClient = new PointsClient({
      apiKey,
      campaignId,
    });
    pointsClient.getPoints(address, eventName)
      .then((data: any) => {
        setFilteredPoints(data)
      })
      .catch((error: any) => {
        toast.error(error);
      });
  };

  return (
    <div className=" text-black min-h-screen flex flex-col justify-center items-center py-10">
      <div className="max-w-md w-full bg-white shadow-md rounded-md p-6">
        <h1 className="text-xl font-semibold mb-4">Get API Key</h1>
        <form onSubmit={handleApiKeySubmit}>
          <div className="mb-4">
            <label htmlFor="campaignName" className="block text-sm font-medium text-gray-700">Campaign Name</label>
            <input
              type="text"
              name="campaignName"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="campaignId" className="block text-sm font-medium text-gray-700">Campaign ID</label>
            <input
              type="text"
              name="campaignId"
              value={campaignId}
              onChange={(e) => setCampaignId(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Submit</button>
        </form>
        {!!apiKey && <p className='mt-3 italic'>Your api key: {apiKey}</p>}
      </div>

      <div className="max-w-md w-full bg-white shadow-md rounded-md p-6 mt-8">
        <h1 className="text-xl font-semibold mb-4">Register Points</h1>
        <form onSubmit={handleRegisterPointsSubmit}>
          <div className="mb-4">
            <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">Event Name</label>
            <input
              type="text"
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="points" className="block text-sm font-medium text-gray-700">Points</label>
            <input
              type="number"
              id="points"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Submit</button>
        </form>
      </div>

      <div className="max-w-md w-full bg-white shadow-md rounded-md p-6 mt-8">
        <h1 className="text-xl font-semibold mb-4">Get Points</h1>
        <form onSubmit={handleGetPointsSubmit}>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              value={filterAddress}
              onChange={(e) => setFilterAddress(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        <div className="mb-4">
            <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">Event Name</label>
            <input
              type="text"
              id="eventName"
              value={filterEventName}
              onChange={(e) => setFilterEventName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Get</button>
        </form>
        {!!filteredPoints && <p>{filteredPoints}</p>}
      </div>
    </div>
  );
};

export default IndexPage;
