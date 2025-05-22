// Define course categories
const courseCategories = [
    { id: 'programming', name: 'Программирование' },
    { id: 'marketing', name: 'Маркетинг' },
    { id: 'design', name: 'Дизайн' },
    { id: 'analytics', name: 'Аналитика' },
    { id: 'finance', name: 'Финансы' },
    { id: 'management', name: 'Управление' },
    { id: 'content', name: 'Контент-маркетинг' },
    { id: 'languages', name: 'Иностранные языки' }
];

// Sample courses data organized by category
const coursesByCategory = {
    programming: [
        {
            title: 'Профессия веб-разработчик',
            school: 'Skillbox',
            rating: 4.5,
            reviews: 58,
            oldPrice: '85 000 руб',
            currentPrice: '66 800 руб',
            monthlyPrice: 'от 4 745 руб/месяц',
            timeType: 'В любое время',
            duration: '3 месяца',
            level: 'Начальный',
            hasInternship: true,
            hasDiploma: true
        },
        {
            title: 'Профессия Frontend-разработчик',
            school: 'Skillbox',
            rating: 4.7,
            reviews: 72,
            oldPrice: '90 000 руб',
            currentPrice: '72 000 руб',
            monthlyPrice: 'от 5 000 руб/месяц',
            timeType: 'В любое время',
            duration: '4 месяца',
            level: 'Начальный',
            hasInternship: true,
            hasDiploma: true
        },
        {
            title: 'Профессия Java-разработчик',
            school: 'Skillbox',
            rating: 4.6,
            reviews: 64,
            oldPrice: '95 000 руб',
            currentPrice: '76 000 руб',
            monthlyPrice: 'от 5 200 руб/месяц',
            timeType: 'В любое время',
            duration: '5 месяцев',
            level: 'Средний',
            hasInternship: true,
            hasDiploma: true
        }
    ],
    marketing: [
        {
            title: 'Профессия Интернет-маркетолог',
            school: 'Нетология',
            rating: 4.8,
            reviews: 92,
            oldPrice: '75 000 руб',
            currentPrice: '60 000 руб',
            monthlyPrice: 'от 4 200 руб/месяц',
            timeType: 'В любое время',
            duration: '3 месяца',
            level: 'Начальный',
            hasInternship: true,
            hasDiploma: true
        },
        {
            title: 'SMM-специалист',
            school: 'GeekBrains',
            rating: 4.5,
            reviews: 48,
            oldPrice: '65 000 руб',
            currentPrice: '52 000 руб',
            monthlyPrice: 'от 3 800 руб/месяц',
            timeType: 'В любое время',
            duration: '2 месяца',
            level: 'Начальный',
            hasInternship: false,
            hasDiploma: true
        }
    ],
    design: [
        {
            title: 'Профессия Графический дизайнер',
            school: 'Skillbox',
            rating: 4.9,
            reviews: 104,
            oldPrice: '92 000 руб',
            currentPrice: '73 600 руб',
            monthlyPrice: 'от 5 100 руб/месяц',
            timeType: 'В любое время',
            duration: '4 месяца',
            level: 'Начальный',
            hasInternship: true,
            hasDiploma: true
        }
    ],
    analytics: [
        {
            title: 'Профессия Аналитик данных',
            school: 'OTUS',
            rating: 4.7,
            reviews: 86,
            oldPrice: '98 000 руб',
            currentPrice: '78 400 руб',
            monthlyPrice: 'от 5 500 руб/месяц',
            timeType: 'По расписанию',
            duration: '5 месяцев',
            level: 'Средний',
            hasInternship: true,
            hasDiploma: true
        }
    ],
    finance: [
        {
            title: 'Финансовый аналитик',
            school: 'SkillFactory',
            rating: 4.6,
            reviews: 52,
            oldPrice: '85 000 руб',
            currentPrice: '68 000 руб',
            monthlyPrice: 'от 4 800 руб/месяц',
            timeType: 'В любое время',
            duration: '4 месяца',
            level: 'Средний',
            hasInternship: false,
            hasDiploma: true
        }
    ],
    management: [
        {
            title: 'Профессия Продакт-менеджер',
            school: 'Нетология',
            rating: 4.8,
            reviews: 78,
            oldPrice: '95 000 руб',
            currentPrice: '76 000 руб',
            monthlyPrice: 'от 5 300 руб/месяц',
            timeType: 'В любое время',
            duration: '4 месяца',
            level: 'Средний',
            hasInternship: true,
            hasDiploma: true
        }
    ],
    content: [
        {
            title: 'Копирайтер',
            school: 'Skillbox',
            rating: 4.5,
            reviews: 64,
            oldPrice: '60 000 руб',
            currentPrice: '48 000 руб',
            monthlyPrice: 'от 3 500 руб/месяц',
            timeType: 'В любое время',
            duration: '2 месяца',
            level: 'Начальный',
            hasInternship: false,
            hasDiploma: true
        }
    ],
    languages: [
        {
            title: 'Английский для IT-специалистов',
            school: 'Skyeng',
            rating: 4.7,
            reviews: 92,
            oldPrice: '70 000 руб',
            currentPrice: '56 000 руб',
            monthlyPrice: 'от 4 000 руб/месяц',
            timeType: 'По расписанию',
            duration: '3 месяца',
            level: 'Начальный',
            hasInternship: false,
            hasDiploma: true
        }
    ]
}; 