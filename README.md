# Preditverse - Decentralized Prediction Platform

Preditverse is a decentralized platform for creating and participating in prediction events. Built on blockchain technology, it enables users to make predictions on various events and earn rewards based on their accuracy.

## Features

- **Event Creation**: Create prediction events with customizable parameters
- **Smart Contract Integration**: Secure and transparent event management through blockchain
- **Real-time Updates**: Live tracking of predictions and event status
- **User Authentication**: Secure login and profile management
- **Responsive Design**: Beautiful UI that works on all devices
- **Company Verification**: Special features for verified companies
- **AI Integration**: AI-powered insights and scoring system

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Smart Contracts**: Solidity, OpenZeppelin
- **Blockchain**: Ethereum
- **Authentication**: Web3 Authentication
- **Styling**: Tailwind CSS, Shadcn UI

## Smart Contract Features

The platform uses a smart contract (`EventContract.sol`) that provides:

- Event creation and management
- Secure prediction handling
- Automated winner selection
- Platform fee management
- Event status tracking
- Participant management

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask or similar Web3 wallet
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/preditverse.git
cd preditverse
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add:
```
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
NEXT_PUBLIC_NETWORK_ID=your_network_id
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Smart Contract Deployment

1. Install Hardhat:
```bash
npm install --save-dev hardhat
```

2. Deploy the contract:
```bash
npx hardhat run scripts/deploy.js --network your_network
```

## Usage

### Creating an Event

1. Connect your Web3 wallet
2. Navigate to the Events page
3. Click "Post New Event"
4. Fill in event details:
   - Title
   - Category
   - Description
   - End Date
5. Submit the event

### Making Predictions

1. Browse available events
2. Select an event
3. Click "Make Prediction"
4. Enter your prediction amount
5. Confirm the transaction

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenZeppelin for smart contract libraries
- Next.js team for the amazing framework
- Tailwind CSS for the styling utilities
- Shadcn UI for the beautiful components 