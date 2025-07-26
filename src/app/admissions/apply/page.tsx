"use client";
import { useState, useRef } from 'react';
import axios from 'axios';

const TABS = [
  { key: 'personal', label: "Personal Details" },
  { key: 'academic', label: "Academic Records" },
  { key: 'nationality', label: "Proof of Nationality" },
  { key: 'guardian', label: "Parent/Guardian Info" },
  { key: 'assessment', label: "Assessment Results" },
];

export default function AdmissionApplication() {
  const [form, setForm] = useState({
    full_name: '',
    date_of_birth: '',
    religion: '',
    health_condition: '',
    grade9_marks: '',
    grade9_mean_grade: '',
    grade9_year: '',
    guardian_name: '',
    guardian_contact: '',
    guardian_occupation: '',
    guardian_id: '',
  });

  const [kjseaNumber, setKjseaNumber] = useState('');
  const [admissionType, setAdmissionType] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);


  // Type for file reference
  type FileRef = {
    birthCertOrPassport: File | null;
    kjsea_result_slip: File | null;
    birthCert: File | null;
    passport_photo: File | null;
    guardian_id_photos: File | null;
    assessment: File | null;
  };

  const filesRef = useRef<FileRef>({
    birthCertOrPassport: null,
    kjsea_result_slip: null,
    birthCert: null,
    passport_photo: null,
    guardian_id_photos: null,
    assessment: null,
  });

  // Type for file validation
  type FileValidation = {
    name: keyof FileRef;
    required: boolean;
  };

  const validateFiles = (files: FileRef, validations: FileValidation[]): string[] => {
    return validations.filter(file => {
      const currentFile = files[file.name];
      if (file.required) {
        return !currentFile;
      }
      return false;
    }).map(file => file.name);
  };

  const files = filesRef.current;

  const updateFiles = (data: Partial<typeof files>) => {
    filesRef.current = { ...filesRef.current, ...data };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: inputFiles } = e.target;
    if (!inputFiles) return;
    updateFiles({ [name]: inputFiles[0] });
    setForm(prev => ({
      ...prev,
      [name]: inputFiles[0]?.name || ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission attempt');
    console.log('Current form data:', form);
    console.log('Current files:', files);

    try {
      // Validate required fields
      const requiredFields = ['full_name', 'date_of_birth', 'religion', 'guardian_name', 'guardian_contact', 'guardian_id', 'grade9_marks', 'grade9_mean_grade', 'grade9_year'];
      const missingFields = requiredFields.filter(field => !form[field as keyof typeof form]);
      
      if (missingFields.length > 0) {
        setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
        return;
      }

      // Validate required files
      const requiredFiles: FileValidation[] = [
        { name: 'birthCertOrPassport', required: true },
        { name: 'birthCert', required: true }
      ];
      const missingFiles = validateFiles(filesRef.current, requiredFiles);
      if (missingFiles.length > 0) {
        setError(`Missing required files: ${missingFiles.join(', ')}`);
        return;
      }

      // Prepare form data
      const formData = new FormData();
      // Add files
      const files = filesRef.current;
      if (files.birthCertOrPassport) {
        formData.append('birth_cert_or_passport', files.birthCertOrPassport);
      }
      if (files.kjsea_result_slip) {
        formData.append('kjsea_result_slip', files.kjsea_result_slip);
      }
      if (files.birthCert) {
        formData.append('birth_cert', files.birthCert);
      }
      if (files.passport_photo) {
        formData.append('passport_photo', files.passport_photo);
      }
      if (files.assessment) {
        formData.append('assessment_results', files.assessment);
      }
      if (files.guardian_id_photos) {
        formData.append('guardian_id_photos', files.guardian_id_photos);
      }
      // Add fields
      formData.append('full_name', form.full_name);
      formData.append('kjsea_number', kjseaNumber);
      formData.append('religion', form.religion);
      formData.append('health_condition', form.health_condition);
      formData.append('grade9_marks', form.grade9_marks);
      formData.append('grade9_year', form.grade9_year);
      formData.append('guardian_name', form.guardian_name);
      formData.append('guardian_contact', form.guardian_contact);
      formData.append('guardian_occupation', form.guardian_occupation);
      formData.append('guardian_id', form.guardian_id);
      formData.append('date_of_birth', form.date_of_birth);
      formData.append('grade9_mean_grade', form.grade9_mean_grade);
      // Set headers
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      };
      const response = await axios.post('http://localhost:4000/admission-applications', formData, config);
      setSuccess('Application submitted successfully!');
      setError(null);
    } catch (err) {
      console.error('Error:', err);
      if (axios.isAxiosError(err)) {
        console.error('Response data:', err.response?.data);
        setError(
          err.response?.data?.details ||
          err.response?.data?.error ||
          err.message ||
          'Error submitting application'
        );
      } else {
        setError('Error submitting application');
      }
    }
  };

  const validateKJSEA = async (number: string) => {
    if (!number.trim()) {
      return false;
    }
    try {
      const response = await axios.get('http://localhost:4000/k-jsea-registrations');
      // response.data is an array of objects with { id, kjsea_number }
      return response.data.some((reg: any) => reg.kjsea_number === number);
    } catch (err) {
      console.error('KJSEA validation error:', err);
      return false;
    }
  };

  const handleAdmissionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAdmissionType(e.target.value);
  };

  const [kjseaValid, setKjseaValid] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">School Admission Application</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div className="border rounded-lg p-4">
          <h2 className="font-bold text-lg mb-4">KJSEA Registration Validation</h2>
          <div className="mb-4">
            <label className="block font-semibold mb-1">KJSEA Registration Number</label>
            <div className="flex space-x-4">
              <input 
                type="text" 
                value={kjseaNumber} 
                onChange={(e) => setKjseaNumber(e.target.value)} 
                className="flex-1 border rounded px-3 py-2"
              />
              <button 
                type="button" 
                onClick={async () => {
                  const isValid = await validateKJSEA(kjseaNumber);
                  if (isValid) {
                    setKjseaValid(true);
                    setError(null);
                  } else {
                    setError('Invalid KJSEA number. Please try again.');
                    setKjseaNumber('');
                  }
                }} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Validate
              </button>
            </div>
          </div>
        </div>

        {kjseaValid && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <fieldset className="border rounded-lg p-4">
              <legend className="font-bold text-lg mb-2">Student's Personal Details</legend>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Full Name</label>
                <input name="full_name" type="text" required className="w-full border rounded px-3 py-2" value={form.full_name} onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Date of Birth</label>
                <input name="date_of_birth" type="date" required className="w-full border rounded px-3 py-2" value={form.date_of_birth} onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Religion</label>
                <input name="religion" type="text" className="w-full border rounded px-3 py-2" value={form.religion} onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Any Health Condition</label>
                <textarea name="health_condition" className="w-full border rounded px-3 py-2" value={form.health_condition} onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Upload Birth Certificate or Passport</label>
                <input name="birthCertOrPassport" type="file" accept=".pdf,.jpg,.jpeg,.png" required onChange={handleFileChange} />
                {files.birthCertOrPassport && (
                  <span className="ml-2 text-sm text-green-700">{files.birthCertOrPassport.name}</span>
                )}
              </div>
            </fieldset>

            <fieldset className="border rounded-lg p-4">
              <legend className="font-bold text-lg mb-2">Academic Records</legend>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Grade 9 Final Exam Marks</label>
                <input name="grade9_marks" type="text" className="w-full border rounded px-3 py-2" value={form.grade9_marks} onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Grade 9 Mean Grade</label>
                <input name="grade9_mean_grade" type="text" className="w-full border rounded px-3 py-2" value={form.grade9_mean_grade} onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Year of Completion of Grade 9</label>
                <input name="grade9_year" type="number" min="1900" max="2099" className="w-full border rounded px-3 py-2" value={form.grade9_year} onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Upload KJSEA Result Slip/Certificate (if applicable)</label>
                <input name="kjsea_result_slip" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
                {files.kjsea_result_slip && (
                  <span className="ml-2 text-sm text-green-700">{files.kjsea_result_slip.name}</span>
                )}
              </div>
            </fieldset>

            <fieldset className="border rounded-lg p-4">
              <legend className="font-bold text-lg mb-2">Parent/Guardian Information</legend>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Name</label>
                <input name="guardian_name" type="text" required className="w-full border rounded px-3 py-2" value={form.guardian_name} onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Contact Details</label>
                <input name="guardian_contact" type="text" required className="w-full border rounded px-3 py-2" value={form.guardian_contact} onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Occupation</label>
                <input name="guardian_occupation" type="text" className="w-full border rounded px-3 py-2" value={form.guardian_occupation} onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Valid Identification Number</label>
                <input name="guardian_id" type="text" required className="w-full border rounded px-3 py-2" value={form.guardian_id} onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Upload Birth Certificate <span className="text-red-500">*</span></label>
                <input name="birthCert" type="file" accept=".pdf,.jpg,.jpeg,.png" required onChange={handleFileChange} />
                {files.birthCert && (
                  <span className="ml-2 text-sm text-green-700">{files.birthCert.name}</span>
                )}
              </div>
            </fieldset>

            <fieldset className="border rounded-lg p-4">
              <legend className="font-bold text-lg mb-2">Entrance Assessment Results</legend>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Upload Assessment Results (if available)</label>
                <input name="assessment" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
                {files.assessment && (
                  <span className="ml-2 text-sm text-green-700">{files.assessment.name}</span>
                )}
              </div>
            </fieldset>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Upload Parent/Guardian ID Photo</label>
              <input name="guardian_id_photos" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
              {files.guardian_id_photos && (
                <span className="ml-2 text-sm text-green-700">{files.guardian_id_photos.name}</span>
              )}
            </div>

            <div className="flex justify-end">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" disabled={!!success}>
                Submit Application
              </button>
            </div>
          </form>
        )}
      </div>
    {success && (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
        {success}
      </div>
    )}
    </div>
  );
} 