import React from "react";

function CallToAction() {
  return (
    <div className="p-8">
      <div
        className="py-12 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/937628094/photo/painted-pink-wall-texture.jpg?s=612x612&w=0&k=20&c=ux_qjxm-bw-FInZy9In8dkPMssuMgKzZaiY4wZpm9tg=')",
        }}
      >
        <div className="bg-black bg-opacity-50 py-12">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">
              Join The Success Journey
            </h1>
            <p className="mb-10 text-lg">Become A Dealer</p>
            <h4>
              Start your organic farming journey today and reap the rewards of
              healthy, bountiful harvests!
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallToAction;
