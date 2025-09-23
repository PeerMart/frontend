export const mockUsdcAbi = [
  {
    type: 'constructor',
    inputs: [{ name: 'initialSupply', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'allowance',
    inputs: [
      { name: 'owner', type: 'address', internalType: 'address' },
      { name: 'spender', type: 'address', internalType: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'approve',
    inputs: [
      { name: 'spender', type: 'address', internalType: 'address' },
      { name: 'value', type: 'uint256', internalType: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [{ name: 'account', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'decimals',
    inputs: [],
    outputs: [{ name: '', type: 'uint8', internalType: 'uint8' }],
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'mint',
    inputs: [
      { name: 'to', type: 'address', internalType: 'address' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'name',
    inputs: [],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'symbol',
    inputs: [],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'totalSupply',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'transfer',
    inputs: [
      { name: 'to', type: 'address', internalType: 'address' },
      { name: 'value', type: 'uint256', internalType: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'transferFrom',
    inputs: [
      { name: 'from', type: 'address', internalType: 'address' },
      { name: 'to', type: 'address', internalType: 'address' },
      { name: 'value', type: 'uint256', internalType: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      { name: 'owner', type: 'address', indexed: true, internalType: 'address' },
      { name: 'spender', type: 'address', indexed: true, internalType: 'address' },
      { name: 'value', type: 'uint256', indexed: false, internalType: 'uint256' }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      { name: 'from', type: 'address', indexed: true, internalType: 'address' },
      { name: 'to', type: 'address', indexed: true, internalType: 'address' },
      { name: 'value', type: 'uint256', indexed: false, internalType: 'uint256' }
    ],
    anonymous: false
  },
  {
    type: 'error',
    name: 'ERC20InsufficientAllowance',
    inputs: [
      { name: 'spender', type: 'address', internalType: 'address' },
      { name: 'allowance', type: 'uint256', internalType: 'uint256' },
      { name: 'needed', type: 'uint256', internalType: 'uint256' }
    ]
  },
  {
    type: 'error',
    name: 'ERC20InsufficientBalance',
    inputs: [
      { name: 'sender', type: 'address', internalType: 'address' },
      { name: 'balance', type: 'uint256', internalType: 'uint256' },
      { name: 'needed', type: 'uint256', internalType: 'uint256' }
    ]
  },
  {
    type: 'error',
    name: 'ERC20InvalidApprover',
    inputs: [{ name: 'approver', type: 'address', internalType: 'address' }]
  },
  {
    type: 'error',
    name: 'ERC20InvalidReceiver',
    inputs: [{ name: 'receiver', type: 'address', internalType: 'address' }]
  },
  { type: 'error', name: 'ERC20InvalidSender', inputs: [{ name: 'sender', type: 'address', internalType: 'address' }] },
  {
    type: 'error',
    name: 'ERC20InvalidSpender',
    inputs: [{ name: 'spender', type: 'address', internalType: 'address' }]
  }
] as const;

export const peerMartAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_usdc', type: 'address', internalType: 'address' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'CANCELLATION_PENALTY_PERCENTAGE',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'FEE_PERCENTAGE',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'PENALTY_PERCENTAGE',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'SELLER_BLOCK_REPORTS_THRESHOLD',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'USDC_DECIMALS',
    inputs: [],
    outputs: [{ name: '', type: 'uint8', internalType: 'uint8' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'blockSellerByOwner',
    inputs: [
      { name: '_seller', type: 'address', internalType: 'address' },
      { name: '_reason', type: 'string', internalType: 'string' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'blockedSellers',
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [
      { name: 'sellerAddress', type: 'address', internalType: 'address' },
      { name: 'reason', type: 'string', internalType: 'string' }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'buyerCanceled',
    inputs: [
      { name: '', type: 'uint256', internalType: 'uint256' },
      { name: '', type: 'address', internalType: 'address' }
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'cancelPurchase',
    inputs: [{ name: '_id', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'confirmPayment',
    inputs: [{ name: '_id', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'createProduct',
    inputs: [
      { name: '_name', type: 'string', internalType: 'string' },
      { name: '_imageUrl', type: 'string', internalType: 'string' },
      { name: '_price', type: 'uint256', internalType: 'uint256' },
      { name: '_description', type: 'string', internalType: 'string' },
      { name: '_inventory', type: 'uint256', internalType: 'uint256' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'getBlockedSellerDetails',
    inputs: [{ name: '_seller', type: 'address', internalType: 'address' }],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct ECommerce.BlockedSeller',
        components: [
          { name: 'sellerAddress', type: 'address', internalType: 'address' },
          { name: 'reason', type: 'string', internalType: 'string' }
        ]
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getProduct',
    inputs: [{ name: '_id', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct ECommerce.Product',
        components: [
          { name: 'id', type: 'uint256', internalType: 'uint256' },
          { name: 'name', type: 'string', internalType: 'string' },
          { name: 'imageUrl', type: 'string', internalType: 'string' },
          { name: 'price', type: 'uint256', internalType: 'uint256' },
          { name: 'seller', type: 'address', internalType: 'address payable' },
          { name: 'sellerName', type: 'string', internalType: 'string' },
          { name: 'description', type: 'string', internalType: 'string' },
          { name: 'inventory', type: 'uint256', internalType: 'uint256' },
          { name: 'totalSold', type: 'uint256', internalType: 'uint256' }
        ]
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getPurchase',
    inputs: [
      { name: '_id', type: 'uint256', internalType: 'uint256' },
      { name: '_buyer', type: 'address', internalType: 'address' }
    ],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct ECommerce.Purchase',
        components: [
          { name: 'productId', type: 'uint256', internalType: 'uint256' },
          { name: 'buyer', type: 'address', internalType: 'address payable' },
          { name: 'isPaid', type: 'bool', internalType: 'bool' },
          { name: 'isSold', type: 'bool', internalType: 'bool' }
        ]
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getSellerDetails',
    inputs: [{ name: '_id', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct ECommerce.SellerContact',
        components: [
          { name: 'location', type: 'string', internalType: 'string' },
          { name: 'phoneNumber', type: 'string', internalType: 'string' }
        ]
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getTotalFeesCollected',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'hasReported',
    inputs: [
      { name: '', type: 'uint256', internalType: 'uint256' },
      { name: '', type: 'address', internalType: 'address' }
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'isSellerBlocked',
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'productCount',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'products',
    inputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      { name: 'id', type: 'uint256', internalType: 'uint256' },
      { name: 'name', type: 'string', internalType: 'string' },
      { name: 'imageUrl', type: 'string', internalType: 'string' },
      { name: 'price', type: 'uint256', internalType: 'uint256' },
      { name: 'seller', type: 'address', internalType: 'address payable' },
      { name: 'sellerName', type: 'string', internalType: 'string' },
      { name: 'description', type: 'string', internalType: 'string' },
      { name: 'inventory', type: 'uint256', internalType: 'uint256' },
      { name: 'totalSold', type: 'uint256', internalType: 'uint256' }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'purchaseProduct',
    inputs: [{ name: '_id', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'purchases',
    inputs: [
      { name: '', type: 'uint256', internalType: 'uint256' },
      { name: '', type: 'address', internalType: 'address' }
    ],
    outputs: [
      { name: 'productId', type: 'uint256', internalType: 'uint256' },
      { name: 'buyer', type: 'address', internalType: 'address payable' },
      { name: 'isPaid', type: 'bool', internalType: 'bool' },
      { name: 'isSold', type: 'bool', internalType: 'bool' }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'rateSeller',
    inputs: [{ name: '_seller', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'registerSeller',
    inputs: [
      { name: '_name', type: 'string', internalType: 'string' },
      { name: '_profileURI', type: 'string', internalType: 'string' },
      { name: '_location', type: 'string', internalType: 'string' },
      { name: '_phoneNumber', type: 'string', internalType: 'string' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  { type: 'function', name: 'renounceOwnership', inputs: [], outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    name: 'reportCanceledPurchase',
    inputs: [{ name: '_id', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'sellerContacts',
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [
      { name: 'location', type: 'string', internalType: 'string' },
      { name: 'phoneNumber', type: 'string', internalType: 'string' }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'sellers',
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [
      { name: 'name', type: 'string', internalType: 'string' },
      { name: 'profileURI', type: 'string', internalType: 'string' },
      { name: 'confirmedPurchases', type: 'uint256', internalType: 'uint256' },
      { name: 'canceledPurchases', type: 'uint256', internalType: 'uint256' },
      { name: 'reportedPurchases', type: 'uint256', internalType: 'uint256' },
      { name: 'rating', type: 'uint256', internalType: 'uint256' }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'totalFeesCollected',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [{ name: 'newOwner', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'unblockSeller',
    inputs: [{ name: '_seller', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'usdc',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'contract IERC20' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'withdrawFees',
    inputs: [{ name: 'to', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      { name: 'previousOwner', type: 'address', indexed: true, internalType: 'address' },
      { name: 'newOwner', type: 'address', indexed: true, internalType: 'address' }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'PaymentConfirmed',
    inputs: [
      { name: 'id', type: 'uint256', indexed: false, internalType: 'uint256' },
      { name: 'name', type: 'string', indexed: false, internalType: 'string' },
      { name: 'price', type: 'uint256', indexed: false, internalType: 'uint256' },
      { name: 'seller', type: 'address', indexed: false, internalType: 'address payable' },
      { name: 'buyer', type: 'address', indexed: false, internalType: 'address payable' }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'ProductCreated',
    inputs: [
      { name: 'id', type: 'uint256', indexed: false, internalType: 'uint256' },
      { name: 'name', type: 'string', indexed: false, internalType: 'string' },
      { name: 'imageUrl', type: 'string', indexed: false, internalType: 'string' },
      { name: 'price', type: 'uint256', indexed: false, internalType: 'uint256' },
      { name: 'seller', type: 'address', indexed: false, internalType: 'address payable' },
      { name: 'sellerName', type: 'string', indexed: false, internalType: 'string' },
      { name: 'inventory', type: 'uint256', indexed: false, internalType: 'uint256' }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'ProductPurchased',
    inputs: [
      { name: 'id', type: 'uint256', indexed: false, internalType: 'uint256' },
      { name: 'name', type: 'string', indexed: false, internalType: 'string' },
      { name: 'price', type: 'uint256', indexed: false, internalType: 'uint256' },
      { name: 'seller', type: 'address', indexed: false, internalType: 'address payable' },
      { name: 'buyer', type: 'address', indexed: false, internalType: 'address payable' },
      { name: 'isPaid', type: 'bool', indexed: false, internalType: 'bool' }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'SellerBlocked',
    inputs: [
      { name: 'sellerAddress', type: 'address', indexed: true, internalType: 'address' },
      { name: 'reason', type: 'string', indexed: false, internalType: 'string' }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'SellerRated',
    inputs: [
      { name: 'sellerAddress', type: 'address', indexed: true, internalType: 'address' },
      { name: 'rating', type: 'uint256', indexed: false, internalType: 'uint256' }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'SellerRegistered',
    inputs: [
      { name: 'sellerAddress', type: 'address', indexed: true, internalType: 'address' },
      { name: 'name', type: 'string', indexed: false, internalType: 'string' },
      { name: 'profileURI', type: 'string', indexed: false, internalType: 'string' }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'SellerUnblocked',
    inputs: [{ name: 'sellerAddress', type: 'address', indexed: true, internalType: 'address' }],
    anonymous: false
  },
  { type: 'error', name: 'AlreadyReported', inputs: [] },
  { type: 'error', name: 'BuyerDidNotCancel', inputs: [] },
  { type: 'error', name: 'ErrSellerBlocked', inputs: [] },
  { type: 'error', name: 'ErrSellerNotBlocked', inputs: [] },
  { type: 'error', name: 'FeeTransferFailed', inputs: [] },
  { type: 'error', name: 'InvalidWithdrawAddress', inputs: [] },
  { type: 'error', name: 'LocationRequired', inputs: [] },
  { type: 'error', name: 'NoPaymentForProduct', inputs: [] },
  { type: 'error', name: 'OwnableInvalidOwner', inputs: [{ name: 'owner', type: 'address', internalType: 'address' }] },
  {
    type: 'error',
    name: 'OwnableUnauthorizedAccount',
    inputs: [{ name: 'account', type: 'address', internalType: 'address' }]
  },
  { type: 'error', name: 'PenaltyToSellerFailed', inputs: [] },
  { type: 'error', name: 'PhoneNumberRequired', inputs: [] },
  { type: 'error', name: 'ProductAlreadyConfirmed', inputs: [] },
  { type: 'error', name: 'ProductAlreadyPurchased', inputs: [] },
  { type: 'error', name: 'ProductAlreadySold', inputs: [] },
  { type: 'error', name: 'ProductDoesNotExist', inputs: [] },
  { type: 'error', name: 'ProductImageRequired', inputs: [] },
  { type: 'error', name: 'ProductInventoryZero', inputs: [] },
  { type: 'error', name: 'ProductNameRequired', inputs: [] },
  { type: 'error', name: 'ProductNotPaid', inputs: [] },
  { type: 'error', name: 'ProductOutOfStock', inputs: [] },
  { type: 'error', name: 'ProductPriceZero', inputs: [] },
  { type: 'error', name: 'ProfileURIRequired', inputs: [] },
  { type: 'error', name: 'RefundToBuyerFailed', inputs: [] },
  { type: 'error', name: 'SellerAlreadyRegistered', inputs: [] },
  { type: 'error', name: 'SellerCannotBuyOwnProduct', inputs: [] },
  { type: 'error', name: 'SellerHasNoConfirmedPurchases', inputs: [] },
  { type: 'error', name: 'SellerIsBlocked', inputs: [] },
  { type: 'error', name: 'SellerNameRequired', inputs: [] },
  { type: 'error', name: 'SellerNotRegistered', inputs: [] },
  { type: 'error', name: 'SellerRatingExceeded', inputs: [] },
  { type: 'error', name: 'USDCTransferFailed', inputs: [] },
  { type: 'error', name: 'ZeroAddress', inputs: [] }
] as const;
