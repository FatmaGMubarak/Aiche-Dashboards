import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BlogHome from "./pages/BlogHome";
import BlogPage from "./pages/BlogPage";
import AwardsPage from "./pages/AwardsPage";
import EventPage from "./pages/EventPage";
import CommitteePage from "./pages/CommitteePage";
import TaskPage from "./pages/TaskPage";
import SessionPage from "./pages/SessionPage";
import NavBar from "./layout/NavBar";
import SliderPage from "./pages/SliderPage";
import MaterialPage from "./pages/MaterialPage";
import BlogForm from "./components/forms/BlogForm";
import AwardForm from "./components/forms/AwardForm";
import EditAwardForm from "./components/forms/EditAwardForm";
import SliderForm from "./components/forms/SliderForm";
import MaterialForm from "./components/forms/MaterialForm";
import SessionForm from "./components/forms/SessionForm";
import EventImagesPage from "./pages/EventImagesPage";
import EventForm from "./components/forms/EventForm";
import TaskForm from "./components/forms/TaskForm";
import CommitteeForm from "./components/forms/CommitteeForm";
import EditBlogForm from "./components/forms/EditBlogForm";
import EditEventForm from "./components/forms/EditEventForm";
import AwardCard from "./components/cards/AwardCard";
import EventData from "./pages/EventData";
import LoginPage from "./pages/LoginPage";
import EditCommitteeForm from "./components/forms/EditCommitteeForm";
import CommitteeData from "./pages/CommitteeData";
import Dashboard from "./pages/Dashboard";
import RegisterAdminPage from "./pages/RegisterAdminPage";
import EditTaskForm from "./components/forms/EditTaskForm";
import EditSessionForm from "./components/forms/EditSessionForm";
import AdminAssignmentPage from "./pages/AdminAssignmentPage";
import CollectionPage from "./pages/CollectionPage";
import CollectionCard from "./components/cards/CollectionCard";
import CollectionForm from "./components/forms/CollectionForm";
import ProductForm from "./components/forms/ProductForm";
import ProductCard from "./components/cards/ProductCard";
import ProductPage from "./pages/ProductPage";
import ProductDetails from "./pages/ProductDetails";
import EditProductForm from "./components/forms/EditProductForm";
import CollectionProductsPage from "./pages/CollectionProductsPage";
import ProfilePage from "./pages/ProfilePage";
import RequestsPage from "./pages/RequestPage";
import EditSliderForm from "./components/forms/EditSliderForm";

function AppContent() {
  const location = useLocation();
  const auth = true;

  const hideNavbarOnRoutes = ["/"]; 

  const showNavbar = !hideNavbarOnRoutes.includes(location.pathname);

  return (
    <>
                    <ToastContainer position="top-right" autoClose={3000} />

<div>
        {showNavbar && <NavBar auth={auth} />}

      <Routes>

        <Route index element={<LoginPage />} path="/" />
        <Route path="/register" element={<RegisterAdminPage />} />
        <Route path="/assign" element={<AdminAssignmentPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blog-home" element={<BlogHome />} />
        <Route path="/request" element={<RequestsPage />} />
        <Route path="/blog-page/:id" element={<BlogPage />} />
        <Route path="/award-page" element={<AwardsPage />} />
        <Route path="/event-page" element={<EventPage />} />
        <Route path="/committee-page" element={<CommitteePage />} />
        <Route path="/committees/:id/task-page" element={<TaskPage />} />
        <Route path="/committees/:id/session-page" element={<SessionPage />} />
        <Route path="/slider-page" element={<SliderPage />} />
        <Route path="/material-page" element={<MaterialPage />} />
        <Route path="/event-image/:id" element={<EventImagesPage />} />
        <Route path="/blog-form" element={<BlogForm />} />
        <Route path="/edit-blog-form/:id" element={<EditBlogForm />} />
        <Route path="/award-form" element={<AwardForm />} />
        <Route path="/material-form" element={<MaterialForm />} />
        <Route path="/committees/:id/session-form" element={<SessionForm />} />
        <Route path="/event-form" element={<EventForm />} />
        <Route path="/edit-event-form/:id" element={<EditEventForm />} />
        <Route path="/committees/:id/task-form" element={<TaskForm />} />
        <Route path="/committee-form" element={<CommitteeForm />} />
        <Route path="/award-card/:id" element={<AwardCard />} />
        <Route path="/edit-award-form/:id" element={<EditAwardForm />} />
        <Route path="/slider-form" element={<SliderForm />} />
        <Route path="/collection-page" element={<CollectionPage />} />
        <Route path="/product-page" element={<ProductPage />} />
        <Route path="/collection-product-page/:id" element={<CollectionProductsPage />} />
        <Route path="/collection-card" element={<CollectionCard />} />
        <Route path="/product-card" element={<ProductCard />} />
        <Route path="/collection-form" element={<CollectionForm />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/product-form" element={<ProductForm />} />
        <Route path="/edit-product-form/:id" element={<EditProductForm />} />
        <Route path="/edit-slider-form/:id" element={<EditSliderForm />} />
        <Route path="/product-detail/:id" element={<ProductDetails />} />
        <Route path="/event-data/:id" element={<EventData />} />
        <Route path="/edit-committee-form/:id" element={<EditCommitteeForm />} />
        <Route path="/committee-data/:id" element={<CommitteeData />} />
        <Route path="/committees/:committeeId/edit-task-form/:taskId" element={<EditTaskForm />} />
        <Route path="/committees/:committeeId/edit-session-form/:sessionId" element={<EditSessionForm />} />
      </Routes>
</div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>

      <AppContent />
    </BrowserRouter>
  );
}
