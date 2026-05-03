import React from 'react';
import { Sun, Mail, Phone, MapPin, Globe, Send, Camera } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 text-primary mb-4">
              <Sun className="h-6 w-6" />
              <span className="text-xl font-bold tracking-tight">SunCart</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Your ultimate destination for premium summer essentials. From high-UV protection to beach-ready outfits, we've got your summer covered.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Contact info</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-500">
                <Mail className="h-4 w-4 mr-2" />
                hello@suncart.com
              </li>
              <li className="flex items-center text-sm text-gray-500">
                <Phone className="h-4 w-4 mr-2" />
                +1 (555) 000-SUMR
              </li>
              <li className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-2" />
                Sunshine Boulevard, CA
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Social Media</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Send className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Camera className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Globe className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} SunCart. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 text-sm text-gray-400 flex space-x-4">
            <span>Made with 🔥 for Summer</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
