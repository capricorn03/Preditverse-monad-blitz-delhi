// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract EventContract is Ownable, ReentrancyGuard {
    struct Event {
        uint256 id;
        string title;
        string category;
        string description;
        uint256 endDate;
        address creator;
        uint256 totalParticipants;
        uint256 totalVolume;
        bool isActive;
        mapping(address => bool) participants;
        mapping(address => uint256) predictions;
    }

    // Events
    event EventCreated(uint256 indexed eventId, string title, address indexed creator);
    event PredictionMade(uint256 indexed eventId, address indexed participant, uint256 amount);
    event EventEnded(uint256 indexed eventId, address indexed winner);

    // State variables
    uint256 private eventCounter;
    mapping(uint256 => Event) public events;
    mapping(address => uint256[]) public userEvents;

    // Constants
    uint256 public constant MINIMUM_PREDICTION = 0.01 ether;
    uint256 public constant PLATFORM_FEE = 2; // 2%

    constructor() Ownable(msg.sender) {}

    function createEvent(
        string memory _title,
        string memory _category,
        string memory _description,
        uint256 _endDate
    ) external returns (uint256) {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_category).length > 0, "Category cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(_endDate > block.timestamp, "End date must be in the future");

        eventCounter++;
        uint256 eventId = eventCounter;

        Event storage newEvent = events[eventId];
        newEvent.id = eventId;
        newEvent.title = _title;
        newEvent.category = _category;
        newEvent.description = _description;
        newEvent.endDate = _endDate;
        newEvent.creator = msg.sender;
        newEvent.isActive = true;

        userEvents[msg.sender].push(eventId);

        emit EventCreated(eventId, _title, msg.sender);
        return eventId;
    }

    function makePrediction(uint256 _eventId) external payable nonReentrant {
        Event storage event_ = events[_eventId];
        require(event_.isActive, "Event is not active");
        require(block.timestamp < event_.endDate, "Event has ended");
        require(msg.value >= MINIMUM_PREDICTION, "Prediction amount too low");
        require(!event_.participants[msg.sender], "Already participated");

        // Calculate platform fee
        uint256 platformFee = (msg.value * PLATFORM_FEE) / 100;
        uint256 predictionAmount = msg.value - platformFee;

        // Update event state
        event_.participants[msg.sender] = true;
        event_.predictions[msg.sender] = predictionAmount;
        event_.totalParticipants++;
        event_.totalVolume += predictionAmount;

        // Transfer platform fee to owner
        (bool success, ) = owner().call{value: platformFee}("");
        require(success, "Platform fee transfer failed");

        emit PredictionMade(_eventId, msg.sender, predictionAmount);
    }

    function endEvent(uint256 _eventId) external nonReentrant {
        Event storage event_ = events[_eventId];
        require(event_.isActive, "Event already ended");
        require(block.timestamp >= event_.endDate, "Event has not ended yet");
        require(msg.sender == event_.creator || msg.sender == owner(), "Not authorized");

        event_.isActive = false;

        // Find winner (in this simple version, the last participant wins)
        address winner = address(0);
        uint256 highestPrediction = 0;

        for (uint256 i = 0; i < event_.totalParticipants; i++) {
            address participant = event_.participants[msg.sender] ? msg.sender : address(0);
            if (event_.predictions[participant] > highestPrediction) {
                highestPrediction = event_.predictions[participant];
                winner = participant;
            }
        }

        if (winner != address(0)) {
            (bool success, ) = winner.call{value: event_.totalVolume}("");
            require(success, "Prize transfer failed");
        }

        emit EventEnded(_eventId, winner);
    }

    function getEventDetails(uint256 _eventId) external view returns (
        string memory title,
        string memory category,
        string memory description,
        uint256 endDate,
        address creator,
        uint256 totalParticipants,
        uint256 totalVolume,
        bool isActive
    ) {
        Event storage event_ = events[_eventId];
        return (
            event_.title,
            event_.category,
            event_.description,
            event_.endDate,
            event_.creator,
            event_.totalParticipants,
            event_.totalVolume,
            event_.isActive
        );
    }

    function getUserEvents(address _user) external view returns (uint256[] memory) {
        return userEvents[_user];
    }

    function getEventParticipantCount(uint256 _eventId) external view returns (uint256) {
        return events[_eventId].totalParticipants;
    }

    function getEventTotalVolume(uint256 _eventId) external view returns (uint256) {
        return events[_eventId].totalVolume;
    }
} 