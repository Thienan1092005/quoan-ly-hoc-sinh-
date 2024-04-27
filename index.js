const getElements = (name) => {
  return document.querySelector(name);
};
const callAPI = () => {
  const data = axios({
    method: "GET",
    url: baseAPI,
  });
  data.then((res) => {
    studentList = res.data;
    render();
  });
};
const render = () => {
  let listTr = "";
  studentList.map((student) => {
    listTr += `<tr><td>${student.id}</td><td>${student.name}</td><td>${student.class}</td><td>${student.diemToan}</td><td>${student.diemLy}</td><td>${student.diemHoa}</td><td>${student.diemTrungBinh}</td><td><button class="delete">Delete</button><button class="edit">Edit</button></td></tr>`;
  });
  tbody.innerHTML = listTr;
};
const addStudent = () => {
  const add = axios({
    method: "POST",
    url: baseAPI,
    data: {
      name: studentName.value,
      class: className.value,
      diemToan: diemToan.value,
      diemLy: diemLy.value,
      diemHoa: diemHoa.value,
      diemTrungBinh: diemTB.value,
    },
  });
  add.then(() => {
    callAPI();
    render();
    studentName.value = "";
    className.value = "";
    diemTB.value = "";
    diemLy.value = "";
    diemHoa.value = "";
    diemTB.value = "";
  });
};
const studentName = getElements(".name");
const className = getElements(".className");
const diemToan = getElements(".diemToan");
const diemLy = getElements(".diemLy");
const diemHoa = getElements(".diemHoa");
const diemTB = getElements(".diemTrungBinh");
const btnAdd = getElements(".btn");
const baseAPI = "https://662b63d6de35f91de1581587.mockapi.io/StudentList";
const tbody = document.querySelector(".tbody");
let studentList = [];
btnAdd.addEventListener("click", addStudent);
callAPI();
render();
