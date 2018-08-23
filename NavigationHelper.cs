using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace SmarterBalanced.SpanishEnglishDemarcation
{
    public static class NavigationHelper
    {
        private static List<string> s_grade4 = new List<string> { "item2803", "item3593", "item3527", "item3607" };
        private static List<string> s_grade7 = new List<string> { "item3695", "item3561", "item3627", "item3635" };
        private static List<string> s_grade11 = new List<string> { "item3694", "item3318", "item3599", "item3298" };

        public static string GetNextUrl(string currentUrl)
        {
            return NavigationHelper.GetModifiedUrl(currentUrl, 1);
        }

        public static string GetPreviousUrl(string currentUrl)
        {
            return NavigationHelper.GetModifiedUrl(currentUrl, -1);
        }

        private static string GetModifiedUrl(string currentUrl, int indexModifier)
        {
            string result = null;
            string currentView = NavigationHelper.GetCurrentViewName(currentUrl);
            List<string> currentViewList = NavigationHelper.GetCorrectList(currentView.ToLower());
            int index = currentViewList.IndexOf(currentView.ToLower());

            if (index >= 0
            && index + indexModifier >= 0
            && index + indexModifier <= currentViewList.Count - 1) //make sure item is found and next item exists in list
            {
                result = NavigationHelper.GetControllerPath(currentUrl) + "/" + currentViewList[index + indexModifier];
            }

            return result;
        }

        private static List<string> GetCorrectList(string currentView)
        {
            List<string> result = s_grade4; //default

            if (s_grade7.Contains(currentView))
            {
                result = s_grade7;
            }
            else if (s_grade11.Contains(currentView))
            {
                result = s_grade11;
            }

            return result;
        }

        private static string GetCurrentViewName(string currentUrl)
        {
            string result = currentUrl.TrimEnd('/');
            int lastIndex = result.LastIndexOf("/");

            if (lastIndex >= 0)
            {
                result = result.Substring(lastIndex, result.Length - lastIndex).TrimStart('/');
            }

            return result;
        }

        private static string GetControllerPath(string currentUrl)
        {
            string result = currentUrl.TrimEnd('/');

            result = result.Substring(0, result.LastIndexOf("/"));

            return result;
        }
    }
}