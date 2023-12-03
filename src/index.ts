type TBadgeSize = {
    single: '4x3',
    double: '4x6'
}

type TPrint = {
    standart: 'color',
    fast: 'zpl'
}

const BadgeSize: TBadgeSize = {
    single: '4x3',
    double: '4x6'
}

const Print: TPrint = {
    standart: 'color',
    fast: 'zpl'
}

enum BadgeTypesEnum {
    COLOR = 'color',
    MONO = 'mono'
}

type BadgeSizeType = keyof typeof BadgeSize;
type PrintType = keyof typeof Print;

type Tgrades = {[computedProperty: string]: number | 'undone'}
// Интересно что с оценкой можно придумать, если оценки нет, всё равно можно оставить number и поставить 0
type Tvisits = {[computedProperty: string]: boolean}

class Student {
    badgeTypeMap: Map<string, BadgeTypesEnum> = new Map([
        ['single_fast', BadgeTypesEnum.COLOR],
        ['single_standart', BadgeTypesEnum.COLOR],
        ['double_fast', BadgeTypesEnum.MONO],
        ['double_standart', BadgeTypesEnum.MONO]
    ])

    _firstName: string;
    _lastName: string;
    _birthYear: number;
    _grades: Tgrades = {}; // Опишите, как объект у которого есть поле workName и mark(оценка может быть выполненно или нет)
    _visits: Tvisits = {}; // Опишите, как объект у которого есть поле lesson (любое имя) и present

    get fullName(): string {
        return `${this._lastName} ${this._firstName}`;
    }

    set fullName(value: string) {
        [this._lastName, this._firstName] = value.split(' ');
    }

    get age() : number {
        return new Date().getFullYear() - this._birthYear;
    }

    constructor(firstName: string, lastName: string, birthYear: number) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthYear = birthYear;
    }

    setGrade(grade:  [string, number]): void {
        this._grades[grade[0]] = grade[1]
    }

    setVisit(visit: [string, boolean]): void {
        this._visits[visit[0]] = visit[1]
    }

    getPerformanceRating(): number {
        const gradeValues: number[] = Object.values(this._grades);

        if (!gradeValues.length) return 0;

        const averageGrade: number =
            gradeValues.reduce((sum: number, grade: number) =>
                sum + grade, 0) / gradeValues.length;

        const attendanceValues: boolean[] = Object.values(this._visits)

        if (!attendanceValues.length) return 0;

        const attendancePercentage: number =
            (attendanceValues.filter((present: boolean) => present)
                .length / attendanceValues.length) * 100;

        return (averageGrade + attendancePercentage) / 2;
    }
}