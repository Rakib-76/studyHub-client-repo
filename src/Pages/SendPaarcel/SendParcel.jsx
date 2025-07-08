import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [showConfirm, setShowConfirm] = useState(false);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [formData, setFormData] = useState(null);

  const type = watch('type'); // Used to conditionally show weight input

  // Cost Calculation Logic
  const calculateCost = (data) => {
    let base = data.type === 'document' ? 50 : 100;
    if (data.weight) base += parseFloat(data.weight) * 10;
    return base;
  };

  // When form is submitted
  const onSubmit = (data) => {
    const cost = calculateCost(data);
    setDeliveryCost(cost);
    setFormData(data);
    toast.info(`Estimated Delivery Cost: ৳${cost}`, {
      position: 'top-center',
      autoClose: false,
    });
    setShowConfirm(true);
  };

  // When user confirms
  const confirmOrder = async () => {
    const order = {
      ...formData,
      creation_date: new Date().toISOString(),
    };

    // Simulated DB action (replace with real API)
    console.log('Saving order:', order);

    toast.success('Parcel successfully submitted!', {
      position: 'top-center',
    });

    setShowConfirm(false);
    reset();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-2">Send a Parcel</h2>
      <p className="text-gray-500 mb-6">Fill in pickup and delivery information to proceed.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* Parcel Info Section */}
        <div>
          <h3 className="text-xl font-semibold mb-2">📦 Parcel Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Type */}
            <div>
              <label className="label">Type</label>
              <select {...register('type', { required: true })} className="select select-bordered w-full">
                <option value="">Select</option>
                <option value="document">Document</option>
                <option value="non-document">Non-Document</option>
              </select>
              {errors.type && <p className="text-red-500 text-sm">Required</p>}
            </div>

            {/* Title */}
            <div>
              <label className="label">Title</label>
              <input {...register('title', { required: true })} className="input input-bordered w-full" />
              {errors.title && <p className="text-red-500 text-sm">Required</p>}
            </div>

            {/* Weight (only if non-document) */}
            {type === 'non-document' && (
              <div>
                <label className="label">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  {...register('weight')}
                  className="input input-bordered w-full"
                />
              </div>
            )}
          </div>
        </div>

        {/* Sender Info Section */}
        <div>
          <h3 className="text-xl font-semibold mb-2">🚚 Sender Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="hidden" {...register('senderName')} value="Current User" />

            <div>
              <label className="label">Contact</label>
              <input {...register('senderContact', { required: true })} className="input input-bordered w-full" />
            </div>

            <div>
              <label className="label">Region</label>
              <input {...register('senderRegion', { required: true })} className="input input-bordered w-full" />
            </div>

            <div>
              <label className="label">Service Center</label>
              <input {...register('senderCenter', { required: true })} className="input input-bordered w-full" />
            </div>

            <div className="md:col-span-2">
              <label className="label">Address</label>
              <input {...register('senderAddress', { required: true })} className="input input-bordered w-full" />
            </div>

            <div>
              <label className="label">Pick-up Instruction</label>
              <input {...register('pickupNote', { required: true })} className="input input-bordered w-full" />
            </div>
          </div>
        </div>

        {/* Receiver Info Section */}
        <div>
          <h3 className="text-xl font-semibold mb-2">🎯 Receiver Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="label">Name</label>
              <input {...register('receiverName', { required: true })} className="input input-bordered w-full" />
            </div>

            <div>
              <label className="label">Contact</label>
              <input {...register('receiverContact', { required: true })} className="input input-bordered w-full" />
            </div>

            <div>
              <label className="label">Region</label>
              <input {...register('receiverRegion', { required: true })} className="input input-bordered w-full" />
            </div>

            <div>
              <label className="label">Service Center</label>
              <input {...register('receiverCenter', { required: true })} className="input input-bordered w-full" />
            </div>

            <div className="md:col-span-2">
              <label className="label">Address</label>
              <input {...register('receiverAddress', { required: true })} className="input input-bordered w-full" />
            </div>

            <div>
              <label className="label">Delivery Instruction</label>
              <input {...register('deliveryNote', { required: true })} className="input input-bordered w-full" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Submit Parcel
          </button>
        </div>
      </form>

      {/* Confirm Delivery Button */}
      {showConfirm && (
        <div className="text-center mt-6">
          <button onClick={confirmOrder} className="btn btn-success">
            Confirm & Pay ৳{deliveryCost}
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default SendParcel;





