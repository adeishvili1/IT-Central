export type RequestStatus = 'new' | 'in_review' | 'needs_clarification' | 'approved' | 'rejected' | 'delegated' | 'in_progress' | 'resolved' | 'closed' | 'cancelled'
export type RequestPriority = 'low' | 'medium' | 'high' | 'critical'
export type RequestCategory = 'hardware' | 'software' | 'access' | 'support' | 'other'

export interface ITRequest {
  id: number
  number: string
  title: string
  category: RequestCategory
  subcategory: string
  status: RequestStatus
  priority: RequestPriority
  requester: string
  region: string
  department: string
  assignee?: string
  createdAt: string
  updatedAt: string
  deadline?: string
  description: string
  justification: string
  forWhom: string
  quantity?: number
  location?: string
  comments: Comment[]
  attachments: string[]
}

export interface Comment {
  id: number
  author: string
  role: string
  text: string
  createdAt: string
}

const requests = ref<ITRequest[]>([
  {
    id: 1,
    number: 'ITC-2026-0001',
    title: 'SSD მოთხოვნა — ქუთაისის ოფისი',
    category: 'hardware',
    subcategory: 'SSD',
    status: 'in_review',
    priority: 'high',
    requester: 'ნინო კვარაცხელია',
    region: 'ქუთაისი',
    department: 'IT',
    assignee: 'გიორგი ბერიძე',
    createdAt: '2026-03-28T09:14:00',
    updatedAt: '2026-03-29T11:30:00',
    deadline: '2026-04-05',
    description: 'სამუშაო კომპიუტერზე HDD ავარიულ მდგომარეობაშია, სჭირდება 512GB SSD გამოცვლა.',
    justification: 'კომპიუტერი ძალიან ნელია, მუშაობა პრაქტიკულად შეუძლებელია.',
    forWhom: 'ნინო კვარაცხელია',
    quantity: 1,
    location: 'ქუთაისის ოფისი — სართ. 2, ოთახი 204',
    comments: [
      { id: 1, author: 'გიორგი ბერიძე', role: 'ცენტრალური IT', text: 'განაცხადი მიღებულია, განხილვა დაიწყო.', createdAt: '2026-03-29T11:30:00' }
    ],
    attachments: []
  },
  {
    id: 2,
    number: 'ITC-2026-0002',
    title: 'Microsoft Office 365 ლიცენზია',
    category: 'software',
    subcategory: 'ლიცენზია',
    status: 'approved',
    priority: 'medium',
    requester: 'დავით მაისურაძე',
    region: 'ბათუმი',
    department: 'ბუღალტერია',
    assignee: 'თამარ ჯოხაძე',
    createdAt: '2026-03-25T14:22:00',
    updatedAt: '2026-03-27T10:15:00',
    deadline: '2026-04-01',
    description: 'ახალ თანამშრომელს სჭირდება Office 365 Business ლიცენზია.',
    justification: 'თანამშრომელი ახლახან შეუერთდა კომპანიას, სამუშაო ინსტრუმენტი სჭირდება.',
    forWhom: 'მარიამ გიგაური',
    quantity: 1,
    location: 'ბათუმის ოფისი',
    comments: [
      { id: 1, author: 'თამარ ჯოხაძე', role: 'ცენტრალური IT', text: 'დამტკიცებულია. ლიცენზია გააქტიურდება 01.04.2026-ში.', createdAt: '2026-03-27T10:15:00' }
    ],
    attachments: []
  },
  {
    id: 3,
    number: 'ITC-2026-0003',
    title: 'VPN წვდომის გახსნა',
    category: 'access',
    subcategory: 'წვდომის გახსნა',
    status: 'new',
    priority: 'high',
    requester: 'ლაშა ბახტაძე',
    region: 'თბილისი',
    department: 'ფინანსები',
    createdAt: '2026-03-31T08:45:00',
    updatedAt: '2026-03-31T08:45:00',
    deadline: '2026-04-02',
    description: 'სჭირდება VPN წვდომა შიდა სისტემებზე დისტანციური მუშაობისათვის.',
    justification: 'თანამშრომელი გადავიდა ჰიბრიდულ სამუშაო რეჟიმზე.',
    forWhom: 'ლაშა ბახტაძე',
    quantity: 1,
    location: 'Home Office',
    comments: [],
    attachments: []
  },
  {
    id: 4,
    number: 'ITC-2026-0004',
    title: 'პრინტერის გაფუჭება — რუსთავი',
    category: 'support',
    subcategory: 'პრინტერის პრობლემა',
    status: 'in_progress',
    priority: 'critical',
    requester: 'ეკა ჯავახიშვილი',
    region: 'რუსთავი',
    department: 'ადმინისტრაცია',
    assignee: 'ვახო კვარაცხელია',
    createdAt: '2026-03-30T11:00:00',
    updatedAt: '2026-04-01T09:30:00',
    deadline: '2026-04-01',
    description: 'HP LaserJet M404 პრინტერი არ ბეჭდავს. ეკრანზე E3 შეცდომა გამოდის.',
    justification: 'გადაუდებელი დოკუმენტები უნდა დაიბეჭდოს.',
    forWhom: 'მთელი განყოფილება',
    quantity: 1,
    location: 'რუსთავის ოფისი — ოთახი 101',
    comments: [
      { id: 1, author: 'ვახო კვარაცხელია', role: 'ცენტრალური IT', text: 'ვიმყოფები ადგილზე, ვამოწმებ.', createdAt: '2026-04-01T09:30:00' }
    ],
    attachments: []
  },
  {
    id: 5,
    number: 'ITC-2026-0005',
    title: 'ახალი კომპიუტერი — გორის ოფისი',
    category: 'hardware',
    subcategory: 'კომპიუტერი',
    status: 'rejected',
    priority: 'low',
    requester: 'სოფო ბერიძე',
    region: 'გორი',
    department: 'HR',
    createdAt: '2026-03-20T10:00:00',
    updatedAt: '2026-03-22T14:00:00',
    deadline: '2026-04-10',
    description: 'ახალი თანამშრომლისთვის კომპიუტერი სჭირდება.',
    justification: 'ახალი დასაქმება.',
    forWhom: 'ახალი თანამშრომელი',
    quantity: 1,
    location: 'გორის ოფისი',
    comments: [
      { id: 1, author: 'გიორგი ბერიძე', role: 'ცენტრალური IT', text: 'საწყობში გვაქვს 2 გამოყოფილი კომპიუტერი. გთხოვთ დააზუსტოთ კონფიგურაციის მოთხოვნები.', createdAt: '2026-03-22T14:00:00' }
    ],
    attachments: []
  },
  {
    id: 6,
    number: 'ITC-2026-0006',
    title: 'ინტერნეტის პრობლემა — ზუგდიდი',
    category: 'support',
    subcategory: 'ინტერნეტის პრობლემა',
    status: 'resolved',
    priority: 'high',
    requester: 'ბექა ნოზაძე',
    region: 'ზუგდიდი',
    department: 'IT',
    assignee: 'ვახო კვარაცხელია',
    createdAt: '2026-03-18T09:00:00',
    updatedAt: '2026-03-18T16:30:00',
    deadline: '2026-03-18',
    description: 'მთელ ოფისში ინტერნეტი გათიშულია დილიდან.',
    justification: 'სამუშაო პროცესი შეჩერებულია.',
    forWhom: 'მთელი ოფისი',
    quantity: 1,
    location: 'ზუგდიდის ოფისი',
    comments: [
      { id: 1, author: 'ვახო კვარაცხელია', role: 'ცენტრალური IT', text: 'Cisco router-ი გადაიტვირთა, ინტერნეტი აღდგა.', createdAt: '2026-03-18T16:30:00' }
    ],
    attachments: []
  }
])

let nextId = 7

export const useRequests = () => {
  const statusLabel: Record<RequestStatus, string> = {
    new: 'ახალი',
    in_review: 'განხილვაში',
    needs_clarification: 'დაზუსტება საჭირო',
    approved: 'დამტკიცებული',
    rejected: 'უარყოფილი',
    delegated: 'დელეგირებული',
    in_progress: 'მიმდინარე',
    resolved: 'შესრულებული',
    closed: 'დახურული',
    cancelled: 'გაუქმებული'
  }

  const statusColor: Record<RequestStatus, string> = {
    new: 'bg-blue-100 text-blue-700',
    in_review: 'bg-yellow-100 text-yellow-700',
    needs_clarification: 'bg-orange-100 text-orange-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
    delegated: 'bg-indigo-100 text-indigo-700',
    in_progress: 'bg-purple-100 text-purple-700',
    resolved: 'bg-teal-100 text-teal-700',
    closed: 'bg-gray-100 text-gray-600',
    cancelled: 'bg-gray-100 text-gray-400'
  }

  const priorityLabel: Record<RequestPriority, string> = {
    low: 'დაბალი',
    medium: 'საშუალო',
    high: 'მაღალი',
    critical: 'კრიტიკული'
  }

  const priorityColor: Record<RequestPriority, string> = {
    low: 'bg-gray-100 text-gray-600',
    medium: 'bg-blue-100 text-blue-700',
    high: 'bg-orange-100 text-orange-700',
    critical: 'bg-red-100 text-red-700'
  }

  const categoryLabel: Record<RequestCategory, string> = {
    hardware: 'აპარატურა',
    software: 'პროგრამული',
    access: 'წვდომა',
    support: 'ტექ. მხარდაჭერა',
    other: 'სხვა'
  }

  const getRequest = (id: number) => requests.value.find(r => r.id === id)

  const createRequest = (data: Partial<ITRequest>) => {
    const now = new Date().toISOString()
    const newReq: ITRequest = {
      id: nextId++,
      number: `ITC-2026-${String(nextId - 1).padStart(4, '0')}`,
      title: data.title ?? '',
      category: data.category ?? 'other',
      subcategory: data.subcategory ?? '',
      status: 'new',
      priority: data.priority ?? 'medium',
      requester: data.requester ?? 'გიორგი ბერიძე',
      region: data.region ?? '',
      department: data.department ?? '',
      assignee: undefined,
      createdAt: now,
      updatedAt: now,
      deadline: data.deadline,
      description: data.description ?? '',
      justification: data.justification ?? '',
      forWhom: data.forWhom ?? '',
      quantity: data.quantity ?? 1,
      location: data.location ?? '',
      comments: [],
      attachments: []
    }
    requests.value.unshift(newReq)
    return newReq
  }

  const updateStatus = (id: number, status: RequestStatus, comment?: string) => {
    const req = requests.value.find(r => r.id === id)
    if (!req) return
    req.status = status
    req.updatedAt = new Date().toISOString()
    if (comment) {
      req.comments.push({
        id: req.comments.length + 1,
        author: 'გიორგი ბერიძე',
        role: 'ცენტრალური IT',
        text: comment,
        createdAt: new Date().toISOString()
      })
    }
  }

  const addComment = (id: number, text: string) => {
    const req = requests.value.find(r => r.id === id)
    if (!req) return
    req.comments.push({
      id: req.comments.length + 1,
      author: 'გიორგი ბერიძე',
      role: 'ცენტრალური IT',
      text,
      createdAt: new Date().toISOString()
    })
    req.updatedAt = new Date().toISOString()
  }

  const stats = computed(() => ({
    total: requests.value.length,
    new: requests.value.filter(r => r.status === 'new').length,
    in_review: requests.value.filter(r => r.status === 'in_review').length,
    in_progress: requests.value.filter(r => r.status === 'in_progress').length,
    approved: requests.value.filter(r => r.status === 'approved').length,
    rejected: requests.value.filter(r => r.status === 'rejected').length,
    resolved: requests.value.filter(r => r.status === 'resolved').length,
    critical: requests.value.filter(r => r.priority === 'critical' && !['resolved','closed','cancelled'].includes(r.status)).length,
    needs_clarification: requests.value.filter(r => r.status === 'needs_clarification').length,
    delegated: requests.value.filter(r => r.status === 'delegated').length
  }))

  return {
    requests,
    getRequest,
    createRequest,
    updateStatus,
    addComment,
    stats,
    statusLabel,
    statusColor,
    priorityLabel,
    priorityColor,
    categoryLabel
  }
}
