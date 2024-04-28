const getElements = (name) => {
  return document.querySelector(name);
};
let selected = null;
const studentName = getElements(".name");
const className = getElements(".className");
const diemToan = getElements(".diemToan");
const diemLy = getElements(".diemLy");
const diemHoa = getElements(".diemHoa");
const diemTB = getElements(".diemTrungBinh");
const btnAdd = getElements(".btn");
const baseAPI = "https://662b63d6de35f91de1581587.mockapi.io/StudentList";
const tbody = document.querySelector(".tbody");
const btnUpdate = getElements(".btnUpdate");
let studentList = [];
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
    listTr += `<tr><td>${student.id}</td><td>${student.name}</td><td>${student.class}</td><td>${student.diemToan}</td><td>${student.diemLy}</td><td>${student.diemHoa}</td><td>${student.diemTrungBinh}</td><td><button onclick =handleDelete(${student.id}) class="delete">Delete</button><button onclick =handleEdit(${student.id}) class="edit">Edit</button></td></tr>`;
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
    studentName.value = "";
    className.value = "";
    diemTB.value = "";
    diemLy.value = "";
    diemHoa.value = "";
    diemTB.value = "";
  });
};
const handleDelete = (id) => {
  if (id == 1) {
    alert("khong the xoa doi tuong dac biet !");
  } else {
    const deleteData = axios({
      method: "DELETE",
      url: `${baseAPI}/${id}`,
    });
    deleteData.then(() => {
      callAPI();
    });
  }
};
const handleEdit = (id) => {
  selected = studentList.find((student) => student.id == id);
  const get = axios({
    method: "GET",
    url: `${baseAPI}/${id}`,
  });
  get.then((res) => {
    let info = res.data;
    studentName.value = info.name;
    className.value = info.class;
    diemToan.value = info.diemToan;
    diemLy.value = info.diemLy;
    diemHoa.value = info.diemHoa;
    diemTB.value = info.diemTrungBinh;
  });
};
const update = () => {
  console.log(`selected is : ` + selected);
  const updateData = axios({
    method: "PUT",
    url: `${baseAPI}/${selected.id}`,
    data: {
      name: studentName.value,
      class: className.value,
      diemToan: diemToan.value,
      diemLy: diemLy.value,
      diemHoa: diemHoa.value,
      diemTrungBinh: diemTB.value,
    },
  });
  updateData.then(() => {
    callAPI();
  });
};
btnUpdate.addEventListener("click", update);
btnAdd.addEventListener("click", addStudent);
callAPI();
