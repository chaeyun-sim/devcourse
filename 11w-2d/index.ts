class Employee {
  constructor(private _empName: string, private _age: number, private _empJob: string) {}

  get empName() {
    return this._empName;
  }

  set empName(val: string) {
    this._empName = val;
  }

  printEmp = (): void => {
    console.log(
      this._empName + '의 나이는 ' + this._age + '이고, 직업은 ' + this._empJob + '입니다.'
    );
  };
}

const employee1 = new Employee('NAME_1', 30, 'JOB_1');
employee1.empName = 'lee'; // 변경 안됨
employee1.printEmp();
