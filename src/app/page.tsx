'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { PointsClient } from 'points-client-sdk';

const IndexPage: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [campaignId, setCampaignId] = useState('');
  const [eventName, setEventName] = useState('');
  const [address, setAddress] = useState('');
  const [filterEventName, setFilterEventName] = useState('');
  const [filterAddress, setFilterAddress] = useState('');
  const [points, setPoints] = useState('');
  const [filteredPoints, setFilteredPoints] = useState();

  const handleApiKeySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/api-key`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        campaign_name: campaignName,
        campaign_id: campaignId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setApiKey(data.key);
          toast.success(`You are registered successfully`);
          return;
        }
        toast.error(`Error in registering api-key`);
        return;
      });
  };

  const handleRegisterPointsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pointsClient = new PointsClient({
      apiKey,
      campaignId,
    });
    pointsClient
      .distribute(eventName, {
        address,
        points: Number(points),
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
    pointsClient
      .getPoints(filterAddress, filterEventName)
      .then((data: any) => {
        setFilteredPoints(data);
      })
      .catch((error: any) => {
        toast.error(error);
      });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-10 text-black">
      <div className="w-full max-w-md rounded-md bg-white p-6 shadow-md">
        <h1 className="mb-4 text-xl font-semibold">Get API Key</h1>
        <form onSubmit={handleApiKeySubmit}>
          <div className="mb-4">
            <label
              htmlFor="campaignName"
              className="block text-sm font-medium text-gray-700"
            >
              Campaign Name
            </label>
            <input
              type="text"
              name="campaignName"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="campaignId"
              className="block text-sm font-medium text-gray-700"
            >
              Campaign ID
            </label>
            <input
              type="text"
              name="campaignId"
              value={campaignId}
              onChange={(e) => setCampaignId(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        {!!apiKey && <p className="mt-3 italic">Your api key: {apiKey}</p>}
      </div>

      <div className="mt-8 w-full max-w-md rounded-md bg-white p-6 shadow-md">
        <h1 className="mb-4 text-xl font-semibold">Register Points</h1>
        <form onSubmit={handleRegisterPointsSubmit}>
          <div className="mb-4">
            <label
              htmlFor="eventName"
              className="block text-sm font-medium text-gray-700"
            >
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="points"
              className="block text-sm font-medium text-gray-700"
            >
              Points
            </label>
            <input
              type="number"
              id="points"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="mt-8 w-full max-w-md rounded-md bg-white p-6 shadow-md">
        <h1 className="mb-4 text-xl font-semibold">Get Points</h1>
        <form onSubmit={handleGetPointsSubmit}>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              value={filterAddress}
              onChange={(e) => setFilterAddress(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="eventName"
              className="block text-sm font-medium text-gray-700"
            >
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              value={filterEventName}
              onChange={(e) => setFilterEventName(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Get
          </button>
        </form>
        {!!filteredPoints && (
          <p className="break-all">{JSON.stringify(filteredPoints)}</p>
        )}
      </div>
    </div>
  );
};

export default IndexPage;
